import * as request from "./request";

const endpoints = {
    GET_ALL_ORDERS: "/orders",
    GET_ORDER_BY_ID: (order_id) => `/order/${order_id}`,
    CHANGE_ORDER_STATUS: (order_id) => `/orders/${order_id}`,
};

export function getAllOrders() {
    return request.get(endpoints.GET_ALL_ORDERS);
}

export function getOrderById(orderId) {
    return request.get(endpoints.GET_ORDER_BY_ID(orderId));
}

export function changeOrderStatus(orderId, orderStatus) {
    return request.post(endpoints.CHANGE_ORDER_STATUS(orderId), orderStatus);
}
