import { get } from "svelte/store";
import { user } from "../stores";
import { authenticateHeaders, headers } from "$utils/header.util";
import { serverUrl } from "$utils/url.util"

export const getFromUser = async () => {
    try {
        const res = await fetch(`${serverUrl}/wishlists`, {
            method: "get",
            headers: authenticateHeaders()
        });
        const json = await res.json();
        if (json.error) {
            return { success: false };
        }
        return { wishlists: json, success: true };
    } catch (error) {
        console.log(error);
    }
}

export const getFromProductId = async (id) => {
    try {
        const res = await fetch(`${serverUrl}/wishlists?product_id=${id}`, {
            method: "get",
            headers
        });
        const json = await res.json();
        if (json.error) {
            return null;
        }
        return { success: true, wishlists: json };
    } catch (error) {
        console.log(error);
    }
}

export const create = async (product) => {
    try {
        const res = await fetch(`${serverUrl}/wishlists`, {
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
        const res = await fetch(`${serverUrl}/wishlists/${wishlist.id}`, {
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