export function getUserData() {
    return JSON.parse(localStorage.getItem("auth"));
}

export function setUserData(user) {
    localStorage.setItem("auth", JSON.stringify(user));
}

export function orderByIdFunction(items, order, setOrderedItems) {
    const its = [...items];
    if (order) {
        its.sort((item1, item2) => item2.id - item1.id);
    } else {
        its.sort((item1, item2) => item1.id - item2.id);
    }
    setOrderedItems(its);
}
