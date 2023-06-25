import * as request from "./request.js";

const endpoints = {
    ALLBRANDS: "/brand",
    ADDBRAND: "/brand",
};

export async function getAllBrands() {
    return request.get(endpoints.ALLBRANDS);
}

export async function createBrand(brandData) {
    return request.post(endpoints.ADDBRAND, brandData);
}
