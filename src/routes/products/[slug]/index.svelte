<script context="module">
    import api from '$lib/api';

    export async function load({ page }) {
        const { slug } = page.params;            
        const res = await api.product.getBySlug(slug);
        if (res.error) {
            return {
                props: { error: res.error }
            }
        }

        return {
            props: { product: res.product }
        }
    }
</script>

<script>
    import ProductDetail from "$lib/components/products/ProductDetail.svelte";
    export let product, error;
</script>

<ProductDetail {product} />