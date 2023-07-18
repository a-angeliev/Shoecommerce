import * as request from "./request";

const endpoints = {
    GET_ALL_ORDERS: "/orders",
};

export function getAllOrders() {
    return request.get(endpoints.GET_ALL_ORDERS);
}
