import * as request from "./request";

const endpoints = {
    PRODUCTS: `/products`,
    GET_PRODUCT_BY_ID: (productId) => `/products/product/${productId}`,
    EDIT_PRODUCT_BASE_BY_ID: (productId) => `/products/product/${productId}`,
    PRODUCT_COMMENTS: (productId) => `/comments/${productId}`,
    EDIT_PRODUCT_IMAGES: (productId) => `/products/product/${productId}/images`,
    ADD_PRODUCT_PAIR: (productId) => `/products/product/${productId}/pairs`,
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

export async function editBaseById(productId, productData) {
    return request.put(endpoints.EDIT_PRODUCT_BASE_BY_ID(productId), productData);
}

export async function editProductImages(productId, imagesData) {
    return request.put(endpoints.EDIT_PRODUCT_IMAGES(productId), imagesData);
}

export async function addProductPair(productId, productData) {
    return request.post(endpoints.ADD_PRODUCT_PAIR(productId), productData);
}

// export async function deleteById(productId) {
//     return request.del(endpoints.GET_PRODUCT_BY_ID(productId));
// }

// export async function getProductCommentsById(productId) {
//     return request.get(endpoints.PRODUCT_COMMENTS(productId));
// }
