import { baseUrl } from "../utils/url.util"

export const getCheckout = (id, type) => {
    return fetch(`${baseUrl}/checkout/${id}?type=${type}`).then(res => res.json());
};