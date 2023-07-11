import * as request from "./request";

const endpoints = {
    PRODUCTS: `/products`,
    GET_PRODUCT_BY_ID: (productId) => `/products/product/${productId}`,
    EDIT_PRODUCT_BASE_BY_ID: (productId) => `/products/product/${productId}`,
    PRODUCT_COMMENTS: (productId) => `/comments/${productId}`,
    EDIT_PRODUCT_IMAGES: (productId) => `/products/product/${productId}/images`,
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

export async function editProductImages(productId, images_data) {
    return request.put(endpoints.EDIT_PRODUCT_IMAGES(productId), images_data);
}
// export async function deleteById(productId) {
//     return request.del(endpoints.GET_PRODUCT_BY_ID(productId));
// }

// export async function getProductCommentsById(productId) {
//     return request.get(endpoints.PRODUCT_COMMENTS(productId));
// }
