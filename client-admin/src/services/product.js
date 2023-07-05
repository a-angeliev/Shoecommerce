import * as request from "./request";

const endpoints = {
    PRODUCTS: `/products`,
    GET_PRODUCT_BY_ID: (productId) => `/products/product/${productId}`,
    PRODUCT_COMMENTS: (productId) => `/comments/${productId}`,
};

export async function getProducts() {
    return request.get(endpoints.PRODUCTS);
}

export async function getProductById(productId) {
    return request.get(endpoints.GET_PRODUCT_BY_ID(productId));
}

export async function create(productData) {
    return request.post(endpoints.PRODUCTS, productData);
}

// export async function updateById(productId, productData) {
//     return request.put(endpoints.GET_PRODUCT_BY_ID(productId), productData);
// }

// export async function deleteById(productId) {
//     return request.del(endpoints.GET_PRODUCT_BY_ID(productId));
// }

// export async function getProductCommentsById(productId) {
//     return request.get(endpoints.PRODUCT_COMMENTS(productId));
// }
