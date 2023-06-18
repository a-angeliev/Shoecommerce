import * as request from "./request";

const endpoints = {
    ORDERS: "/orders",
    ORDERS_BY_ID: (orderId) => `/orders/${orderId}`,
};

export async function createOrder(orderData) {
    return request.post(endpoints.ORDERS, orderData);
}

export async function getAllOrders() {
    return request.get(endpoints.ORDERS);
}

export async function updateStatus(statusData, orderId) {
    return request.post(endpoints.ORDERS_BY_ID(orderId), statusData);
}
