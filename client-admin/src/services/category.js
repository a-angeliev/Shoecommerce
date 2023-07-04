import * as request from "./request.js";

const endpoints = {
    GETALLCATEGORIES: "/category",
    CREATECATEGORY: "/category",
};

export async function getAllCategories() {
    return request.get(endpoints.GETALLCATEGORIES);
}

export async function createCategory(categoryData) {
    return request.post(endpoints.CREATECATEGORY, categoryData);
}
