import * as request from "./request.js";

const endpoints = {
    ALLBRANDS: "/brand",
    ADDBRAND: "/brand",
    BRANDBYID: (brandId) => `/brand/${brandId}`,
    EDITBRAND: (brandId) => `/brand/${brandId}`,
    DELETEBRAND: (brandId) => `/brand/${brandId}`,
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

export async function editBrandById(brandId, brandData) {
    return request.put(endpoints.EDITBRAND(brandId), brandData);
}

export async function deleteBrandById(brandId) {
    return request.del(endpoints.DELETEBRAND(brandId));
}
