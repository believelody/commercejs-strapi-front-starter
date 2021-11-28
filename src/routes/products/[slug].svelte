<script context="module">
    import api from '$lib/api';

    export async function load({ page }) {
        const { slug } = page.params;            
        const { product } = await api.product.getProductBySlug(slug);

        return {
            props: { product }
        }
    }
</script>

<script>
    import ProductDetail from "$lib/components/products/ProductDetail.svelte";
    export let product;
</script>

<ProductDetail {product} />