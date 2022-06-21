import api from "$lib/api";

export async function get() {
    try {
        const res = await api.server.get("products/category/pets");
        if (res.error) {
            return { status: 404, body: { error: res.error } };
        }
        return {
            body: {
                products: res.products, meta: res.meta
            }
        };
    } catch (error) {
        console.log(error);
    }
}