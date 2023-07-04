import * as request from "./request.js";

const endpoints = {
    GETALLCATEGORIES: "/category",
    CREATECATEGORY: "/category",
    GETCATEGORYBYID: (categoryId) => `/category/${categoryId}`,
    EDITCATEGORY: (categoryId) => `/category/${categoryId}`,
    DELETECATEGORY: (categoryId) => `/category/${categoryId}`,
};

export async function getAllCategories() {
    return request.get(endpoints.GETALLCATEGORIES);
}

export async function createCategory(categoryData) {
    return request.post(endpoints.CREATECATEGORY, categoryData);
}

export async function getCategoryById(categoryId) {
    return request.get(endpoints.GETCATEGORYBYID(categoryId));
}

export async function editCategory(categoryId, categoryData) {
    return request.put(endpoints.EDITCATEGORY(categoryId), categoryData);
}

export async function deleteCategory(categoryId) {
    return request.del(endpoints.DELETECATEGORY(categoryId));
}
