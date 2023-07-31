import * as request from "./request";

const endpoints = {
    LOGIN: "/login",
    REGISTER: "/register",
    USER: (userId) => `/user/${userId}`,
};

export async function login(userData) {
    return request.post(endpoints.LOGIN, userData);
}

export async function register(userData) {
    return request.post(endpoints.REGISTER, userData);
}

export async function getUser(userId) {
    return request.get(endpoints.USER(userId));
}
