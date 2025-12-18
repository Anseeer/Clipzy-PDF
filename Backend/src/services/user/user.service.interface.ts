import { UserResponseDTO } from "../../mappers/user/user.dto.interface";
import { IUser } from "../../models/user/user.model.interface";

export interface IUserService {
    register(userData: Partial<IUser>): Promise<{ accessToken: string, refreshToken: string, user: UserResponseDTO }>;
    login(userData: Partial<IUser>): Promise<{ accessToken: string, refreshToken: string, user: UserResponseDTO }>;
    fetchData(id:string): Promise<{ user: UserResponseDTO }>;
}