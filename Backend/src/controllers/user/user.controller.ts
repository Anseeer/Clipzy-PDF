import jwt from "jsonwebtoken";
import { NextFunction, Request, Response } from "express";
import { IUserService } from "../../services/user/user.service.interface";
import { IUserController } from "./user.controller.interface";
import logger from "../../utilities/logger";
import { COMMON_MESSAGE, USER_MESSAGE } from "../../constants/messages";
import { ErrorResponse, SuccessResponse } from "../../utilities/response";
import { StatusCode } from "../../constants/statusCode";
import { generateAccessToken } from "../../utilities/generateToken";
import { AuthRequest } from "../../middlewares/auth.middleware";

export class UserController implements IUserController {

    private _userService: IUserService;
    constructor(userServ: IUserService) {
        this._userService = userServ;
    }

    register = async (req: Request, res: Response, next: NextFunction): Promise<void> => {
        try {
            const { userData } = req.body;
            if (!userData.name || !userData.email || !userData.password) {
                throw new Error(USER_MESSAGE.CREDENTIALS_NOT_FOUND)
            }

            const { user, accessToken, refreshToken } = await this._userService.register(userData);
            if (!user) {
                throw new Error(USER_MESSAGE.REGISTRATION_FAILED);
            }

            res.cookie("refreshToken", refreshToken, {
                httpOnly: true,
                secure: process.env.NODE_ENV === "production",
                sameSite: "strict",
                maxAge: 7 * 24 * 60 * 60 * 1000, // 7 days
            });

            res.cookie("accessToken", accessToken, {
                httpOnly: true,
                secure: process.env.NODE_ENV === "production",
                sameSite: "strict",
                maxAge: 15 * 60 * 1000, // 15 min
            });

            const response = new SuccessResponse(StatusCode.OK, USER_MESSAGE.REGISTRATION_FAILED, { user })
            res.status(StatusCode.OK).json(response)

        } catch (error) {
            const errMsg = error instanceof Error ? error.message : String(error);
            logger.error(errMsg);
            next(new ErrorResponse(errMsg, StatusCode.BAD_REQUEST))
        }
    }

    login = async (req: Request, res: Response, next: NextFunction): Promise<void> => {
        try {
            const { userData } = req.body;
            if (!userData.email || !userData.password) {
                throw new Error(USER_MESSAGE.CREDENTIALS_NOT_FOUND)
            }

            const { user, accessToken, refreshToken } = await this._userService.login(userData);
            if (!user) {
                throw new Error(USER_MESSAGE.USER_NOT_FOUND);
            }

            res.cookie("refreshToken", refreshToken, {
                httpOnly: true,
                secure: process.env.NODE_ENV === "production",
                sameSite: "strict",
                maxAge: 7 * 24 * 60 * 60 * 1000, // 7 days
            });

            res.cookie("accessToken", accessToken, {
                httpOnly: true,
                secure: process.env.NODE_ENV === "production",
                sameSite: "strict",
                maxAge: 15 * 60 * 1000, // 15 min
            });

            const response = new SuccessResponse(StatusCode.OK, USER_MESSAGE.LOGIN_SUCCESS, { user })
            res.status(StatusCode.OK).json(response)

        } catch (error) {
            const errMsg = error instanceof Error ? error.message : String(error);
            logger.error(errMsg);
            next(new ErrorResponse(errMsg, StatusCode.BAD_REQUEST))
        }
    }

    logout = async (req: Request, res: Response, next: NextFunction): Promise<void> => {
        try {

            res.clearCookie("refreshToken", {
                httpOnly: true,
                secure: process.env.NODE_ENV === "production",
                sameSite: "strict",
                maxAge: 7 * 24 * 60 * 60 * 1000, // 7 days
            });

            res.clearCookie("accessToken", {
                httpOnly: true,
                secure: process.env.NODE_ENV === "production",
                sameSite: "strict",
                maxAge: 15 * 60 * 1000, // 15 min
            });

            const response = new SuccessResponse(StatusCode.OK, USER_MESSAGE.LOGOUT_SUCCESS, {})
            res.status(StatusCode.OK).json(response)

        } catch (error) {
            const errMsg = error instanceof Error ? error.message : String(error);
            logger.error(errMsg);
            next(new ErrorResponse(errMsg, StatusCode.BAD_REQUEST))
        }
    }

    refreshToken = async (req: Request, res: Response, next: NextFunction) => {
        try {
            const refreshToken = req.cookies?.refreshToken;

            if (!refreshToken) {
                throw new ErrorResponse(
                    COMMON_MESSAGE.UNAUTHORIZED,
                    StatusCode.UNAUTHORIZED
                );
            }

            const decoded = jwt.verify(
                refreshToken,
                process.env.JWT_REFRESH_SECRET!
            ) as { id: string };

            const newAccessToken = generateAccessToken(decoded.id);

            res.cookie("accessToken", newAccessToken, {
                httpOnly: true,
                secure: process.env.NODE_ENV === "production",
                sameSite: "strict",
                maxAge: 15 * 60 * 1000, // 15 min
            });

            const response = new SuccessResponse(StatusCode.OK, COMMON_MESSAGE.REFRESH_ACCESS_TOKEN, {})
            res.status(StatusCode.OK).json(response)
        } catch (error) {
            const errMsg = error instanceof Error ? error.message : String(error);
            logger.error(errMsg); next(
                new ErrorResponse(
                    COMMON_MESSAGE.TOKEN_INVALID,
                    StatusCode.UNAUTHORIZED
                )
            );
        }
    }

    fetchData = async (req: AuthRequest, res: Response, next: NextFunction) => {
        try {

            if (!req.user) {
                throw new ErrorResponse(
                    COMMON_MESSAGE.UNAUTHORIZED,
                    StatusCode.UNAUTHORIZED
                );
            }

            const userId = req.user.id;
            const user = await this._userService.fetchData(userId)

            const response = new SuccessResponse(StatusCode.OK, USER_MESSAGE.FETCH_DATA_SUCCESS, { user })
            res.status(StatusCode.OK).json(response)
        } catch (error) {
            const errMsg = error instanceof Error ? error.message : String(error);
            logger.error(errMsg); next(
                new ErrorResponse(
                    COMMON_MESSAGE.TOKEN_INVALID,
                    StatusCode.UNAUTHORIZED
                )
            );
        }
    }

}