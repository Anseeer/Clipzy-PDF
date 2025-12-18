import { createSlice } from "@reduxjs/toolkit";
import type { IUser } from "../types/IUser";

interface UserState {
    user: IUser | null,
    isAuthenticated: boolean
}

const initialState: UserState = {
    user: null,
    isAuthenticated: false
}

export const userSlice = createSlice({
    name: "user",
    initialState,
    reducers: {
        loginSuccess: (state, action) => {
            state.user = action.payload.user;
            state.isAuthenticated = true;
        },
        registerSuccess: (state, action) => {
            state.user = action.payload.user;
            state.isAuthenticated = true;
        },
        setUser: (state, action) => {
            state.user = action.payload.user;
            state.isAuthenticated = true;
        },
        logoutSuccess: (state) => {
            state.user = null;
            state.isAuthenticated = false;
        }
    }
});

export const { loginSuccess, registerSuccess, logoutSuccess, setUser } = userSlice.actions;