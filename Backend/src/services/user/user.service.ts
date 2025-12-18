import { USER_MESSAGE } from "../../constants/messages";
import { mapToUserEntityDTO, mapToUserResponseDTO } from "../../mappers/user/user.dto";
import { UserResponseDTO } from "../../mappers/user/user.dto.interface";
import { IUser } from "../../models/user/user.model.interface";
import { IUserRepository } from "../../repositories/user/user.repo.interface";
import { generateAccessToken, generateRefreshToken } from "../../utilities/generateToken";
import logger from "../../utilities/logger";
import { IUserService } from "./user.service.interface";
import bcrypt from "bcrypt"

export class UserService implements IUserService {
    private _userRepository: IUserRepository;
    constructor(userRepo: IUserRepository) {
        this._userRepository = userRepo;
    }

    register = async (userData: Partial<IUser>): Promise<{ accessToken: string, refreshToken: string, user: UserResponseDTO }> => {
        try {

            if (!userData) {
                throw new Error(USER_MESSAGE.DATA_NOT_FOUND);
            }

            const existingUser = await this._userRepository.findByEmail(userData?.email as string);
            if (existingUser) {
                throw new Error(USER_MESSAGE.ALREADY_EXISTS)
            }

            const hashPass = await bcrypt.hash(userData.password as string, 10)
            userData.password = hashPass;

            const mapUserData = await mapToUserEntityDTO(userData)

            const user = await this._userRepository.create(mapUserData)
            const userDTO = mapToUserResponseDTO(user)
            const accessToken = await generateAccessToken(userDTO?.id as string)
            const refreshToken = await generateRefreshToken(userDTO?.id as string)

            return { accessToken, refreshToken, user: userDTO }
        } catch (error) {
            const errMsg = error instanceof Error ? error.message : String(error);
            logger.error(errMsg);
            throw new Error(errMsg);
        }
    }

    login = async (userData: Partial<IUser>): Promise<{ accessToken: string, refreshToken: string, user: UserResponseDTO }> => {
        try {

            if (!userData) {
                throw new Error(USER_MESSAGE.DATA_NOT_FOUND);
            }

            const existingUser = await this._userRepository.findByEmail(userData?.email as string);
            if (!existingUser) {
                throw new Error(USER_MESSAGE.USER_NOT_FOUND)
            }

            const match = await bcrypt.compare(userData?.password as string, existingUser.password)
            if (!match) {
                throw new Error(USER_MESSAGE.INVALID_PASSWORD)
            }

            const userDTO = mapToUserResponseDTO(existingUser)
            const accessToken = await generateAccessToken(userDTO?.id as string)
            const refreshToken = await generateRefreshToken(userDTO?.id as string)

            return { accessToken, refreshToken, user: userDTO }
        } catch (error) {
            const errMsg = error instanceof Error ? error.message : String(error);
            logger.error(errMsg);
            throw new Error(errMsg);
        }
    }

    fetchData = async (id: string): Promise<{ user: UserResponseDTO }> => {
        try {

            if (!id) {
                throw new Error(USER_MESSAGE.ID_NOT_GET);
            }

            const user = await this._userRepository.findById(id as string);
            if (!user) {
                throw new Error(USER_MESSAGE.USER_NOT_FOUND)
            }

            const userDTO = mapToUserResponseDTO(user)

            return { user: userDTO }
        } catch (error) {
            const errMsg = error instanceof Error ? error.message : String(error);
            logger.error(errMsg);
            throw new Error(errMsg);
        }
    }

}