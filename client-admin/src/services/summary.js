import * as request from "../services/request";

const endpoints = {
    GET_SUMMARY: "/orders/statistic",
};

export async function getSummary() {
    return request.get(endpoints.GET_SUMMARY);
}
