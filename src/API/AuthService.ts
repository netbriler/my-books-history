import axios from "axios";

export default class AuthService {
    static _apiBase = process.env.BASE_URL

    static login() {
        window.location.href = this._apiBase + '/oauth/google';
    }

    static async refresh() {
        return await axios.get(this._apiBase + '/oauth/refresh', {withCredentials: true})
    }

    static logout() {
        localStorage.removeItem('token');
        return axios.get(this._apiBase + '/oauth/logout', {withCredentials: true})
    }

}