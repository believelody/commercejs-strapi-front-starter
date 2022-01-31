import { get } from "svelte/store";
import { user } from "../stores";
import { authenticateHeaders, authorizationHeaders, headers } from "../utils/header.util";
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
        return { success: true, reviews: json.reviews };
    } catch (error) {
        console.log(error);
    }
}

export const create = async (productId, description, ratings, images) => {
    try {
        let userId = get(user).id;        
        const res = await fetch(`${baseUrl}/reviews`, {
            method: "post",
            headers: authenticateHeaders(),
            body: JSON.stringify({
                productId,
                user: userId,
                description,
                ratings
            })
        });
        const json = await res.json();
        if (json.error) {
            return { success: false, error: json.error };
        }
        if (images.length) {
            const formData = new FormData();
            formData.append("ref", "review");
            formData.append("refId", json.id);
            formData.append("field", "images");
            formData.append("path", "review/images");
            for (let image of images) {
                formData.append("files", image, image.name);
            }
            const formRes = await fetch(`${baseUrl}/upload`, {
                method: "post",
                headers: authorizationHeaders(),
                body: formData
            });
            if (!formRes.ok) {
                return { success: false };
            }
        }
        return { success: true };
    } catch (error) {
        console.log(error);
        return { success: false };
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