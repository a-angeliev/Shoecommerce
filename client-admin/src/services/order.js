import * as request from "./request";

const endpoints = {
    GET_ALL_ORDERS: "/orders",
    GET_ORDER_BY_ID: (order_id) => `/order/${order_id}`,
};

export function getAllOrders() {
    return request.get(endpoints.GET_ALL_ORDERS);
}

export function getOrderById(order_id) {
    return request.get(endpoints.GET_ORDER_BY_ID(order_id));
}
