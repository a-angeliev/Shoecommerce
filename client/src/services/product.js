import * as request from './request';

const endpoints = {
    PRODUCTS: `/product`,
    GET_PRODUCT_BY_ID: (productId) => `/product/${productId}`,
    PRODUCT_COMMENTS: (productId) => `/comments/${productId}`,
};

export async function getProductCommentsById(productId) {
    return request.get(endpoints.PRODUCT_COMMENTS(productId));
}
