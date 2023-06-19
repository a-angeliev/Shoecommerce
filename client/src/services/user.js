import * as request from "./request";

const endpoints = {
    LOGIN: "/login",
    REGISTER: "/register",
    USER: (userId) => `/user/${userId}`,
    USER_ORDERS: (userId) => `/user/${userId}/orders`,
    USER_COMMENTS: (userId) => `/user/${userId}/comments`,
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

export async function updateUser(userId, userData) {
    return request.put(endpoints.USER(userId), userData);
}

export async function deleteUser(userId) {
    return request.del(endpoints.USER(userId));
}

export async function getOrders(userId) {
    return request.get(endpoints.USER_ORDERS(userId));
}

export async function getComments(userId) {
    return request.get(endpoints.USER_COMMENTS(userId));
}
