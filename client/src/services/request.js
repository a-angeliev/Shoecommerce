import { getUserData } from '../utils/util';

const host = 'http://127.0.0.1:5000';

async function request(method, url, data) {
    const options = {
        method,
        headers: {},
    };

    if (data !== undefined) {
        options.headers['Content-Type'] = 'application/json';
        options.body = JSON.stringify(data);
    }

    const user = getUserData();

    if (user) {
        options.headers['x-access-token'] = user.token;
    }

    try {
        const response = await fetch(host + url, options);

        if (response.ok === false) {
            if (response.status === 403) {
                localStorage.removeItem('user');
            }

            const err = await response.json();
            throw new Error(err.message);
        }

        if (response.status === 400) {
            const err = await response.json();
            throw new Error(err.message);
        }

        if (response.status === 204) {
            return response;
        } else {
            return await response.json();
        }
    } catch (error) {
        throw error;
    }
}

const get = request.bind(null, 'GET');
const post = request.bind(null, 'POST');
const put = request.bind(null, 'PUT');
const patch = request.bind(null, 'PATCH');
const del = request.bind(null, 'DELETE');

export { get, post, put, patch, del };
