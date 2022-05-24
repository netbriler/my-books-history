import $api from "../http";

export default class AuthService {
    static _apiBase = process.env.BASE_URL

    static async sendCode(code: string, redirect_uri: string) {
        return await $api.get(this._apiBase + '/oauth/google/redirect', {
            params: {
                code: code,
                redirect_uri: redirect_uri
            }
        });
    }

    static async getMe() {
        return await $api.get(this._apiBase + '/api/v1/user/me/');
    }

    static async refresh() {
        return await $api.get(this._apiBase + '/oauth/refresh')
    }

    static async logout() {
        localStorage.removeItem('token');
        return await $api.get(this._apiBase + '/oauth/logout')
    }

}