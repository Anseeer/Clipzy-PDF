import { USER_MESSAGE } from "../../constants/messages";
import { IUser } from "../../models/user/user.model.interface";
import { UserEntityDTO, UserResponseDTO } from "./user.dto.interface";


export const mapToUserResponseDTO = (user: IUser): UserResponseDTO => {
    return {
        id: user._id.toString(),
        name: user.name,
        email: user.email,
        createdAt: user.createdAt,
    };
};

export const mapToUserEntityDTO = (user: Partial<IUser>): UserEntityDTO => {
    if (!user.name || !user.email || !user.password ) {
        throw new Error(USER_MESSAGE.INVALID_ENTITY);
    }
    return {
        name: user.name,
        email: user.email,
        password: user.password,
    };
};
