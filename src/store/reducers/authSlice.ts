import {createSlice, PayloadAction} from "@reduxjs/toolkit";
import {IUser} from "../../types/user";
import {RootState} from "../store";

export interface AuthState {
    user: IUser | null;
    token: string | null;
}

const initialState: AuthState = {
    user: null,
    token: typeof window !== 'undefined' ? localStorage.getItem('token') : null,
}

export const authSlice = createSlice({
    name: 'auth',
    initialState,
    reducers: {
        setUser: (
            state,
            action: PayloadAction<{ user: IUser; token?: string | undefined }>) => {

            state.user = action.payload.user;

            if (action.payload.token !== undefined) {
                state.token = action.payload.token;
                localStorage.setItem('token', action.payload.token);
            }
        },
        logout: (state) => {
            fetch(process.env.BASE_URL + '/oauth/logout', {credentials: 'include'});
            localStorage.removeItem('token');
            state.user = null;
            state.token = null;
        }
    },
})

export const selectAuth = (state: RootState) => state.auth;
export const {setUser, logout} = authSlice.actions;
export default authSlice.reducer;
