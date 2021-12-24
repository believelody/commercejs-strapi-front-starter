import { baseUrl } from "../utils/url.util";
import { authenticateHeaders } from '$lib/utils/header.util';

export const getAll = async () => {
    try {
        const res = await fetch(`${baseUrl}/users/me/orders`, {
            method: "get",
            headers: authenticateHeaders()
        });
        const json = await res.json();
        if (json.error) {
            return { success: false, error: json.error }
        }
        return {success: true, ...json};
    } catch (error) {
        console.log(error);
    }
}

export const getOne = async (reference) => {
    try {
        const res = await fetch(`${baseUrl}/users/me/orders/${reference}?type=reference`, {
            method: "get",
            headers: authenticateHeaders()
        });
        const json = await res.json();
        if (json.error) {
            return { success: false, error: json.error }
        }
        return { success: true, order: json.data };
    } catch (error) {
        console.log(error);
    }
}