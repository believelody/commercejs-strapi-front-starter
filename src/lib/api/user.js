import {baseUrl} from "../utils/url.util";
import {authenticateHeaders} from "../utils/header.util";
import {user} from "../stores";


export const updateUser = async (data) => {
    try {
        const res = await fetch(`${baseUrl}/users/me`, {
            method: "put",
            headers: authenticateHeaders(),
            body: JSON.stringify(data)
        });
        const json = await res.json();
        user.set(json.user);
        user.useLocalStorage();
    } catch (e) {
        console.log(e);
    }
}

export const sendOrderEmail = async (data, id) => {
    try {
        const res = await fetch(`${baseUrl}/users/me/orders/${id}/contact`, {
            method: "post",
            headers: authenticateHeaders(),
            body: JSON.stringify(data)
        });
        console.log(res);
        const json = await res.json();
        if (json.error) {
            return { success: false, error: json.error }
        }
        return { success: json.sent };
    } catch (error) {
        console.log(error);
    }
}