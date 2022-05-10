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
        // @ts-ignore
        const currentUrl = new URL(document.location).origin;
        localStorage.setItem('apiUrl', API_URL);
        window.location.href = `${API_URL}/oauth/google?redirect_uri=${currentUrl}/oauth2-redirect.html`;
    }

    async logout() {
        try {
            localStorage.removeItem('token');
            this.setAuth(false);
            this.setUser({} as IUser);
            await AuthService.logout()
        } catch (e) {
            console.log(e.response?.data);
        }
    }

    async checkAuth() {
        try {
            const response = await AuthService.getMe();
            this.setAuth(true);
            this.setUser(response.data);
            return false;
        } catch (e) {
            console.log(e.response?.data);
            return true;
        }
    }
}