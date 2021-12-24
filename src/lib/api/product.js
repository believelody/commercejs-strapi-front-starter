import { baseUrl } from "../utils/url.util";

export const getAll = async () => {
    try {
        const res = await fetch(`${baseUrl}/products/category/pets`);
        const json = await res.json();
        if (json.error) {
            return { success: false, error: json.error };
        }
        return { success: true, products: json.products, meta: json.meta };
    } catch (error) {
        console.log(error);
    }
}

export const getBySlug = async slug => {
    try {
        const res = await fetch(`${baseUrl}/products/${slug}?type=permalink`);
        const json = res.json();
        if (json.error) {
            return { success: false, error: json.error };
        }
        return { success: true, product: json };
    } catch (error) {
        console.log(error);
    }
}

export const getById = async id => {
    try {
        const res = await fetch(`${baseUrl}/products/${id}`);
        const json = res.json();
        if (json.error) {
            return { success: false, error: json.error };
        }
        return { success: true, product: json };
    } catch (error) {
        console.log(error);
    }
}