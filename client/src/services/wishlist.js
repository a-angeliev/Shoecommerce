import * as request from "./request.js";

const endpoints = {
    ADDWISH: "/wishes",
    WISHLIST: "/wishes",
    REMOVEWISH: "/wishes",
};

export async function addWish(wishId) {
    return request.post(endpoints.ADDWISH, wishId);
}
export async function removeWish(wishId) {
    return request.del(endpoints.REMOVEWISH, wishId);
}
export async function getWishlist() {
    return request.get(endpoints.WISHLIST);
}
