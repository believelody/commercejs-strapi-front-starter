import { cart } from "../stores";
import { baseUrl } from '../utils/url.util';
import { headers } from "../utils/header.util";

export const createCart = async () => {
    try {
        const res = await fetch(`${baseUrl}/cart`);
        const json = await res.json();
        cart.set(json.cart);
        cart.useLocalStorage();
    } catch (error) {
        console.log(error);
    }
}

export const addToCart = async (cartId, id, quantity, options = null) => {
    try {
        const res = await fetch(`${baseUrl}/cart/${cartId}/add-item`, {
            method: "post",
            headers,
            body: JSON.stringify({ quantity, id, options })
        });
        const json = await res.json();
        if (json.cart) {
            cart.set(json.cart);
            cart.useLocalStorage();
        }
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
        if (json.cart) {
            cart.set(json.cart);
            cart.useLocalStorage();
        }
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
        if (json.cart) {
            cart.set(json.cart);
            cart.useLocalStorage();
        }
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
        if (json.success) {
            cart.set(null);
            cart.useLocalStorage();
        }
    } catch (error) {
        console.log(error);
    }
}