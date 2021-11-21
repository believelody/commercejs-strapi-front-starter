import { baseUrl } from "../utils/url.util";

export const getCategories = async (slug) => {
    try {
        const res = await fetch(`${baseUrl}/categories/${slug}`);
        const json = await res.json();
        return json;
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