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

}