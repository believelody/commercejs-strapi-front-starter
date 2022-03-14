import { serverUrl } from "$utils/url.util";

export const getAll = async () => {
    console.log(serverUrl);
    try {
        const res = await fetch(`${serverUrl}/products/category/pets`);
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
        const res = await fetch(`${serverUrl}/products/${slug}?type=permalink`);
        const json = await res.json();
        if (json.error) {
            return { success: false, error: json.error };
        }
        return { success: true, product: json.product };
    } catch (error) {
        console.log(error);
    }
}

export const getById = async id => {
    try {
        const res = await fetch(`${serverUrl}/products/${id}`);
        const json = await res.json();
        if (json.error) {
            return { success: false, error: json.error };
        }
        return { success: true, product: json.product };
    } catch (error) {
        console.log(error);
    }
}

export const getSlug = async id => {
    try {
        const res = await fetch(`${serverUrl}/products/${id}/slug`);
        const json = await res.json();
        if (json.error) {
            return { success: false, error: json.error };
        }
        return { success: true, slug: json.slug };
    } catch (error) {
        console.log(error);
    }
}

export const getIdBySlug = async slug => {
    try {
        const res = await fetch(`${serverUrl}/products/${slug}/get-id`);
        const json = await res.json();
        if (json.error) {
            return { success: false, error: json.error };
        }
        return { success: true, product_id: json.product_id };
    } catch (error) {
        console.log(error);
    }
}

export const getBySearch = async search => {
    try {
        const res = await fetch(`${serverUrl}/search/products?query=${search}`);
        const json = await res.json();
        if (json.error) {
            return { success: false, error: json.error };
        }
        return { success: true, products: json.products, meta: json.meta };
    } catch (error) {
        console.log(error);
    }
}

export const getVariants = async id => {
    try {
        const res = await fetch(`${serverUrl}/products/${id}/variants`);
        const json = await res.json();
        if (json.error) {
            return { success: false, error: json.error };
        }
        return { success: true, variants: json.variants };
    } catch (error) {
        console.log(error);
    }
}