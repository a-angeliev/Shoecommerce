import * as request from "./request.js";

const endpoints = {
    GET_ALL_CATEGORIES: "/category",
    CREATE_CATEGORY: "/category",
    GET_CATEGORY_BY_ID: (categoryId) => `/category/${categoryId}`,
    EDIT_CATEGORY: (categoryId) => `/category/${categoryId}`,
    DELETE_CATEGORY: (categoryId) => `/category/${categoryId}`,
};

export async function getAllCategories() {
    return request.get(endpoints.GET_ALL_CATEGORIES);
}

export async function createCategory(categoryData) {
    return request.post(endpoints.CREATE_CATEGORY, categoryData);
}

export async function getCategoryById(categoryId) {
    return request.get(endpoints.GET_CATEGORY_BY_ID(categoryId));
}

export async function editCategory(categoryId, categoryData) {
    return request.put(endpoints.EDIT_CATEGORY(categoryId), categoryData);
}

export async function deleteCategory(categoryId) {
    return request.del(endpoints.DELETE_CATEGORY(categoryId));
}
