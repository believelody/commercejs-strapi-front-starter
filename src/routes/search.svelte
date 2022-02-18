<script context="module">
    import api from "$lib/api";

    export async function load({ url }) {
        const search = url.searchParams.get("word");
        const res = await api.product.getBySearch(search);
        if (res.error) {
            return {
                props: { error: res.error }
            }
        }
        return {
            props: {
                products: res.products,
                meta: res.meta,
            }
        }
    }
</script>

<script>
    export let products, meta;
</script>

<style>
    /* your styles go here */
</style>

<p>{JSON.stringify(products, 2, null)}</p>