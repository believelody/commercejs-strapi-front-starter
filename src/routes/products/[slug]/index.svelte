<script context="module">
    import api from '$api';

    export async function load({ params }) {
        const { slug } = params;
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
    import ProductDetail from "$components/products/ProductDetail.svelte";
    export let product, error;
</script>

<ProductDetail {product} />