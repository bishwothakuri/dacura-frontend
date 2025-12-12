const API_BASE_URL = process.env.NEXT_PUBLIC_API_ENDPOINT;
const API_VERSION = '/api/v1';
const API_BASE_URL_WITH_VERSION = `${API_BASE_URL}${API_VERSION}`;

export const API_ROUTES = {
    USERS: `${API_BASE_URL_WITH_VERSION}/users`,
    DOCUMENTS: `${API_BASE_URL_WITH_VERSION}/documents`,
};

export const APP_PATHS = {
    ABOUT: '/about',
    BLOG: '/blog',
    CONTACT: '/contact',
    DASHBOARD: '/dashboard',
    LOGIN: '/login',
    MY_PROFILE: '/my-profile',
    USERS: '/users',
    SIGNUP: '/signup',
};
