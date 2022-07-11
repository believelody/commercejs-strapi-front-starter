import * as auth from './auth'
import * as cart from './cart';
import * as checkout from './checkout';
import * as product from './product';
import * as category from './category';
import * as order from './order';
import * as address from './address';
import * as wishlist from './wishlist';
import * as review from './review';
import * as user from './user';
import { serverUrl } from '$utils/url.util';

const headers = {
    "Content-Type": "application/json"
}

export const setAuthorization = jwt => {
    if (jwt) {
        headers["Authorization"] = `Bearer ${jwt}`;
    }
}

export const unsetAuthorization = () => {
    delete headers["Authorization"];
}

async function get(path) {
    const res = await fetch(path, {
        method: "get",
        headers
    });
    const json = await res.json();
    return json;
}

async function post(path, body) {
    const res = await fetch(path, {
        method: "post",
        headers,
        body: JSON.stringify(body),
    });
    const json = await res.json();
    return json;
}

async function put(path, body) {
    const res = await fetch(path, {
        method: "put",
        headers,
        body: JSON.stringify(body),
    });
    const json = await res.json();
    return json;
}

async function del(path) {
    const res = await fetch(path, {
        method: "delete",
        headers
    });
    const json = await res.json();
    return json;
}

export default {
    client: {
        get: path => get(`http://localhost:3000/api/${path}`),
        post: (path, body) => post(`http://localhost:3000/api/${path}`, body),
        put: (path, body) => put(`http://localhost:3000/api/${path}`, body),
        delete: path => del(`http://localhost:3000/api/${path}`),
    },
    server: {
        get: path => get(`${serverUrl}/${path}`),
        post: (path, body) => post(`${serverUrl}/${path}`, body),
        put: (path, body) => put(`${serverUrl}/${path}`, body),
        delete: path => del(`${serverUrl}/${path}`),
    },
    auth,
    cart,
    checkout,
    product,
    category,
    order,
    address,
    wishlist,
    review,
    user
};