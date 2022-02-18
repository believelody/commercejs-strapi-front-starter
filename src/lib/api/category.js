import { baseUrl } from "../utils/url.util";


export const getAll = async () => {
    try {
        const res = await fetch(`${baseUrl}/categories`);
        const json = await res.json();
        if (json.error) {
            return { success: false, error: json.error };
        }
        return { success: true, categories: json.categories, meta: json.meta };
    } catch (error) {
        console.log(error);
    }
}

export const getOneBySlug = async (slug) => {
    try {
        const res = await fetch(`${baseUrl}/categories/${slug}`);
        const json = await res.json();
        if (json.error) {
            return { success: false, error: json.error };
        }
        return { success: true, category: json.category };
    } catch (error) {
        console.log(error);
    }
}

export const getProductByCategory = async slug => {
    try {
        const res = await fetch(`${baseUrl}/products/category/${slug}`);
        const json = res.json();
        return json;
    } catch (error) {
        console.log(error);
    }
}