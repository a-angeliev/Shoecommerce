import * as request from "./request.js";

const endpoints = {
    ALL_BRANDS: "/brand",
    ADD_BRAND: "/brand",
    BRAND_BY_ID: (brandId) => `/brand/${brandId}`,
    EDIT_BRAND: (brandId) => `/brand/${brandId}`,
    DELETE_BRAND: (brandId) => `/brand/${brandId}`,
};

export async function getAllBrands() {
    return request.get(endpoints.ALL_BRANDS);
}

export async function createBrand(brandData) {
    return request.post(endpoints.ADD_BRAND, brandData);
}

export async function getBrandById(brandId) {
    return request.get(endpoints.BRAND_BY_ID(brandId));
}

export async function editBrandById(brandId, brandData) {
    return request.put(endpoints.EDIT_BRAND(brandId), brandData);
}

export async function deleteBrandById(brandId) {
    return request.del(endpoints.DELETE_BRAND(brandId));
}
