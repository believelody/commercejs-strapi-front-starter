import { cart } from "../stores";
import { baseUrl } from '../utils/url.util';
import { headers } from "../utils/header.util";

export const getById = async (id) => {
    try {
        const res = await fetch(`${baseUrl}/cart/${id}`);
        const json = await res.json();
        if (json.error) {
            return { success: false, error: json.error }
        }
        cart.set(json.cart);
        cart.useLocalStorage();
        return json;
    } catch (error) {
        console.log(error);
    }
}

export const createCart = async () => {
    try {
        const res = await fetch(`${baseUrl}/cart`);
        const json = await res.json();
        if (json.error) {
            return { success: false, error: json.error }
        }
        cart.set(json);
        cart.useLocalStorage();
        return { success: true };
    } catch (error) {
        console.log(error);
    }
}

export const addToCart = async (cartId, id, quantity, variant = null) => {
    try {
        const res = await fetch(`${baseUrl}/cart/${cartId}/add-item`, {
            method: "post",
            headers,
            body: JSON.stringify({ quantity, id, variant })
        });
        const json = await res.json();
        if (json.error) {
            return { success: false, error: json.error }
        }
        cart.set(json.cart);
        cart.useLocalStorage();
        return { success: true };
    } catch (error) {
        console.log(error);
    }
}

export const addItems = async (cartId, items) => {
    try {
        const res = await fetch(`${baseUrl}/cart/${cartId}/add-items`, {
            method: "post",
            headers,
            body: JSON.stringify(items)
        });
        const json = await res.json();
        if (json.error) {
            return { success: false, error: json.error }
        }
        cart.set(json.cart);
        cart.useLocalStorage();
        return { success: true };
    } catch (error) {
        console.log(error);
    }
}

export const updateItemQuantity = async (cartId, id, quantity) => {
    try {
        const res = await fetch(`${baseUrl}/cart/${cartId}/items/${id}`, {
            method: "put",
            headers,
            body: JSON.stringify({ quantity })
        });
        const json = await res.json();
        if (json.error) {
            return { success: false, error: json.error }
        }
        cart.set(json.cart);
        cart.useLocalStorage();
        return { success: true };
    } catch (error) {
        console.log(error);
    }
}

export const deleteItem = async (cartId, itemId) => {
    try {
        const res = await fetch(`${baseUrl}/cart/${cartId}/items/${itemId}`, {
            method: "delete"
        });
        const json = await res.json();
        if (json.error) {
            return { success: false, error: json.error }
        }
        cart.set(json.cart);
        cart.useLocalStorage();
        return { success: true };
    } catch (error) {
        console.log(error);
    }
}

export const emptyCart = async (cartId) => {
    try {
        const res = await fetch(`${baseUrl}/cart/${cartId}/items`, {
            method: "delete"
        });
        const json = await res.json();
        if (json.error) {
            return { success: false, error: json.error }
        }
        cart.set(null);
        cart.useLocalStorage();
        return { success: true };
    } catch (error) {
        console.log(error);
    }
}