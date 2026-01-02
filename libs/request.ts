import { PUBLIC_ENV } from '@/config/environment';
import axios from 'axios';

const axiosInstance = axios.create({
    baseURL: PUBLIC_ENV.API_ENDPOINT,
    headers: {
        'ngrok-skip-browser-warning': 'yes',
        'Content-Type': 'application/json',
    },
    // Keep this true if your backend also sets cookies (hybrid approach),
    // otherwise you can set it to false if pure JWT.
    withCredentials: true,
});

// --- 1. REQUEST INTERCEPTOR (The "Badge Pinner") ---
// Before every request, check if we have a token and attach it.
axiosInstance.interceptors.request.use(
    (config) => {
        // We check window existence because Next.js renders on server too
        if (typeof window !== 'undefined') {
            // MATCH THIS KEY with what you use in your Login page
            const token = localStorage.getItem('accessToken');

            if (token) {
                config.headers.Authorization = `Bearer ${token}`;
            }
        }
        return config;
    },
    (error) => {
        return Promise.reject(error);
    }
);

// --- 2. RESPONSE INTERCEPTOR (The "Bouncer") ---
axiosInstance.interceptors.response.use(
    (response) => {
        return response;
    },
    (error: any) => {
        // 401 = Unauthorized (Token expired or missing) -> Go to Login
        if (error.response && error.response.status === 401) {
            if (typeof window !== 'undefined') {
                localStorage.removeItem('accessToken'); // Clear bad token
                window.location.href = '/login'; // Force redirect
            }
        }

        // 403 = Forbidden (You are logged in, but role is too low) -> Unauthorized page
        if (error.response && error.response.status === 403) {
            if (typeof window !== 'undefined') {
                window.location.href = '/unauthorized';
            }
        }

        return Promise.reject(error);
    }
);

// Helper functions (No changes needed here)
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
