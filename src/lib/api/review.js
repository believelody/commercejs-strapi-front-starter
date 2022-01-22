import { get } from "svelte/store";
import { user } from "../stores";
import { authenticateHeaders, headers } from "../utils/header.util";
import { baseUrl } from "../utils/url.util"

export const getFromUser = async () => {
    try {
        const res = await fetch(`${baseUrl}/reviews`, {
            method: "get",
            headers: authenticateHeaders()
        });
        const json = await res.json();
        if (json.error) {
            return { success: false };
        }
        return { reviews: json.reviews, success: true };
    } catch (error) {
        console.log(error);
    }
}

export const getFromProductId = async (id) => {
    try {
        const res = await fetch(`${baseUrl}/reviews?product_id=${id}`, {
            method: "get",
            headers
        });
        const json = await res.json();
        if (json.error) {
            return { success: false, error: json.error };
        }
        return { success: true, reviews: json };
    } catch (error) {
        console.log(error);
    }
}

export const create = async (product) => {
    try {
        const res = await fetch(`${baseUrl}/reviews`, {
            method: "post",
            headers: authenticateHeaders(),
            body: JSON.stringify({ productId: product.id, product, users: get(user).id })

        });
        const json = await res.json();
        if (json.error) {
            return { success: false }
        }
        return { success: true, wishlist: json };
    } catch (error) {
        console.log(error);
    }
}

export const update = async (wishlist) => {
    try {
        const users = wishlist.users.find(item => item.id === get(user).id) ? wishlist.users.filter(item => item.id !== get(user).id) : [...wishlist.users, get(user)];
        const res = await fetch(`${baseUrl}/reviews/${wishlist.id}`, {
            method: "put",
            headers: authenticateHeaders(),
            body: JSON.stringify({ users })

        });
        const json = await res.json();
        if (json.error) {
            return { success: false }
        }
        return { success: true, wishlist: json };
    } catch (error) {
        console.log(error);
    }
}