import { getUserData } from "../utils/util";
import { useLocalStorage } from "../hooks/useLocalStorage";

const host = "http://127.0.0.1:5000";

async function request(method, url, data) {
    const options = {
        method,
        headers: {},
    };

    if (data !== undefined) {
        options.headers["Content-Type"] = "application/json";
        // options.headers["mode"] = "no-cors";
        options.body = JSON.stringify(data);
    }

    const user = getUserData();
    console.log(user);
    // const user = useLocalStorage("auth");

    if (user) {
        options.headers["x-access-token"] = user.token;
        console.log(user.token);
    }

    try {
        console.log(host + url);
        console.log(options);
        const response = await fetch(host + url, options);

        if (response.ok === false) {
            if (response.status === 403) {
                localStorage.removeItem("user");
            }

            const err = await response.json();
            // console.dir(err);
            throw err;
        }

        if (response.status === 400) {
            const err = await response.json();
            throw new Error(err.message);
        }

        if (response.status === 204) {
            console.log(response.status, "Status code");
            return response;
        } else {
            return await response.json();
        }
    } catch (error) {
        throw error;
    }
}

const get = request.bind(null, "GET");
const post = request.bind(null, "POST");
const put = request.bind(null, "PUT");
const patch = request.bind(null, "PATCH");
const del = request.bind(null, "DELETE");

export { get, post, put, patch, del };
