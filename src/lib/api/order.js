import { baseUrl } from "../utils/url.util";
import { authenticateHeaders } from '$lib/utils/header.util';

export const getOrders = async () => {
    try {
        const res = await fetch(`${baseUrl}/users/me/orders`, {
            method: "get",
            headers: authenticateHeaders()
        });
        const json = await res.json();
        return json;
    } catch (error) {
        console.log(error);
    }
}