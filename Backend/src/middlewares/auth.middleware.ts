import { NextFunction, Request, Response } from "express";
import { ErrorResponse, SuccessResponse } from "../utilities/response";
import { StatusCode } from "../constants/statusCode";
import { COMMON_MESSAGE } from "../constants/messages";
import jwt from "jsonwebtoken";
import { generateAccessToken } from "../utilities/generateToken";

interface jwtPayload {
    id: string
}

export interface AuthRequest extends Request {
    user?: jwtPayload
}

export const auth = (req: AuthRequest, res: Response, next: NextFunction) => {
    try {
        const accessToken = req.cookies?.accessToken;
        const refreshToken = req.cookies?.refreshToken;
        if (accessToken) {
            const decoded = jwt.verify(
                accessToken,
                process.env.JWT_ACCESS_SECRET as string
            ) as jwtPayload;

            req.user = { id: decoded.id };

            next();
        } else if (refreshToken) {
            const decoded = jwt.verify(
                refreshToken,
                process.env.JWT_REFRESH_SECRET as string
            ) as jwtPayload;

            const newAccessToken = generateAccessToken(decoded.id);

            res.cookie("accessToken", newAccessToken, {
                httpOnly: true,
                sameSite: "none",
                secure: true,
                maxAge: 15 * 60 * 1000, // 15 min
            });

            req.user = { id: decoded.id };
            next();
        } else {
            const response = new SuccessResponse(StatusCode.UNAUTHORIZED, COMMON_MESSAGE.UNAUTHORIZED, {})
            res.status(StatusCode.UNAUTHORIZED).json(response);
        }

    } catch (error) {
        next(
            new ErrorResponse(
                COMMON_MESSAGE.TOKEN_INVALID,
                StatusCode.UNAUTHORIZED,
                { error }
            )
        );
    }
};
