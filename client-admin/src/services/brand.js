import * as request from "./request.js";

const endpoints = {
    ALLBRANDS: "/brand",
    ADDBRAND: "/brand",
    BRANDBYID: (brandId) => `/brand/${brandId}`,
};

export async function getAllBrands() {
    return request.get(endpoints.ALLBRANDS);
}

export async function createBrand(brandData) {
    return request.post(endpoints.ADDBRAND, brandData);
}

export async function getBrandById(brandId) {
    return request.get(endpoints.BRANDBYID(brandId));
}
