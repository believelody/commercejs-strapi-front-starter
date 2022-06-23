import api from "$api";

export async function get({ url, params }) {
    console.log("params : ", params);
    const urlParams = url.searchParams;
    console.log("url : ", url);
    console.log("limit : ", urlParams.get("limit"));
    console.log("page : ", urlParams.get("page"));
    const limit = urlParams.get('limit') || 6;
    const page = urlParams.get('page') || 1;
    try {
        const res = await api.server.get(`products/category/pets?limit=${limit}&page=${page}`);
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