import axios from 'axios';

export const API_URL = process.env.BASE_URL

const $api = axios.create({
    withCredentials: true,
    baseURL: API_URL
})

$api.interceptors.request.use((config) => {
    config.headers.Authorization = `Bearer ${localStorage.getItem('token')}`
    return config;
})

$api.interceptors.response.use((config) => {
    return config;
},async (error) => {
    const originalRequest = error.config;
    if (error.response.status == 401 && error.config && !error.config._isRetry) {
        originalRequest._isRetry = true;
        try {
            const response = await $api.post(`${API_URL}/oauth/refresh`)
            localStorage.setItem('token', response.data.accessToken);
            return $api.request(originalRequest);
        } catch (e) {
            window.open(`${API_URL}/oauth/google?redirect_uri=http://localhost:3000/oauth2-redirect`, '_blank', 'location=yes,height=570,width=520,scrollbars=yes,status=yes');
        }
    }
    throw error;
})

export default $api;