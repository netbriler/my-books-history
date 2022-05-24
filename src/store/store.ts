import AuthService from "../API/AuthService";
import {API_URL} from "../http";
import {IUser} from "../types/user";

export default class Store {
    user = {} as IUser;
    isAuth = false;

    setAuth(bool: boolean) {
        this.isAuth = bool;
    }

    setUser(user: IUser) {
        this.user = user;
    }

    login() {
        window.location.href = `${API_URL}/oauth/google`;
    }

    async logout() {
        localStorage.removeItem('token');
        this.setAuth(false);
        this.setUser({} as IUser);
        await AuthService.logout()
    }

    async checkAuth() {
        try {
            const response = await AuthService.getMe();
            this.setAuth(true);
            this.setUser(response.data);
        } catch (e) {
            await this.logout();
        }
    }
}