import {serverUrl} from "$utils/url.util";
import {authenticateHeaders} from "$utils/header.util";
import {profile} from "../stores";

export const update = async (data) => {
    try {
        const res = await fetch(`${serverUrl}/users/me`, {
            method: "put",
            headers: authenticateHeaders(),
            body: JSON.stringify(data)
        });
        const json = await res.json();
        if (json.error) {
            return { success: false, error: json.error };
        }
        profile.set(json.customer);
        profile.useLocalStorage();
        return { success: true };
    } catch (e) {
        console.log(e);
    }
}

export const sendOrderEmail = async (data, id) => {
    try {
        const res = await fetch(`${serverUrl}/users/me/orders/${id}/contact`, {
            method: "post",
            headers: authenticateHeaders(),
            body: JSON.stringify(data)
        });
        const json = await res.json();
        if (json.error) {
            return { success: false, error: json.error }
        }
        return { success: json.sent };
    } catch (error) {
        console.log(error);
    }
}

export const updatePassword = async (password, newPassword) => {
    try {
        const res = await fetch(`${serverUrl}/users/me/update-password`, {
            method: "put",
            headers: authenticateHeaders(),
            body: JSON.stringify({ password, newPassword })
        });
        const json = await res.json();
        if (json.error) {
            return { success: false, error: json.error };
        }
        return { success: true };
    } catch (e) {
        console.log(e);
    }
}