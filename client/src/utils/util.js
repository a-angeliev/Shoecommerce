export function getUserData() {
    return JSON.parse(localStorage.getItem("auth"));
}

export function setUserData(user) {
    localStorage.setItem("auth", JSON.stringify(user));
}
