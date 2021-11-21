import { baseUrl } from "../utils/url.util";

export const getProducts = async () => {
    try {
        const res = await fetch(`${baseUrl}/products/category/pets`);
        const json = await res.json();
        return json;
    } catch (error) {
        console.log(error);
    }
}

export const getProductBySlug = async slug => {
    try {
        const res = await fetch(`${baseUrl}/products/${slug}`);
        const json = res.json();
        return json;
    } catch (error) {
        console.log(error);
    }
}