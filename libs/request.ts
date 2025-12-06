import { PUBLIC_ENV } from '@/config/environment';
import axios from 'axios';

const axiosInstance = axios.create({
    baseURL: PUBLIC_ENV.API_ENDPOINT,
    headers: {
        'ngrok-skip-browser-warning': 'yes',
    },
    withCredentials: true,
});

//used to logout when token expire
axiosInstance.interceptors.response.use(
    (response) => {
        return response;
    },
    (error: any) => {
        if (error.response && error.response.status === 403) {
            window.location.href = '/unauthorized';
        }
        return Promise.reject(error);
    }
);

axiosInstance.defaults.withCredentials = true;

const getRequest = async (url: string, config = {}) =>
    axiosInstance.get(url, config);

const postRequest = async (url: string, body: any, config = {}) =>
    axiosInstance.post(url, body, config);

const putRequest = async (url: string, body: any, config = {}) =>
    axiosInstance.put(url, body, config);

const delRequest = async (url: string, config = {}) =>
    axiosInstance.delete(url, config);

const patchRequest = async (url: string, body: any, config = {}) =>
    axiosInstance.patch(url, body, config);

export {
    getRequest,
    postRequest,
    putRequest,
    delRequest,
    patchRequest,
    axiosInstance,
};
