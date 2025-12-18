import api from "../configs/axios";
import { API } from "../constants/api.routes";
import { USER_MESSAGE } from "../constants/messages";
import type { IUser } from "../types/IUser";

export const login = async (userData: Partial<IUser>) => {
    if (!userData) {
        throw new Error(USER_MESSAGE.USER_DATA_NOT_GET)
    }
    return await api.post(API.USER.LOGIN, { userData })
}

export const register = async (userData: Partial<IUser>) => {
    if (!userData) {
        throw new Error(USER_MESSAGE.USER_DATA_NOT_GET)
    }
    return await api.post(API.USER.REGISTER, { userData })
}

export const logout = async () => {
    return await api.post(API.USER.LOGOUT)
}

export const getMe = async () => {
    return await api.get("/me");
};
