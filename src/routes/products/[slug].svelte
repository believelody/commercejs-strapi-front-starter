<script context="module">
import ProductDetail from "$lib/components/products/ProductDetail.svelte";
import { baseUrl } from "$lib/utils/url.util";


    export async function load({ fetch, page }) {
        try {
            const { slug } = page.params;
            const res = await fetch(`${baseUrl}/products/${slug}`);
            const { product } = await res.json();

            return {
                props: { product }
            }
        } catch (error) {
            console.log(error);
            return {
                props: { error }
            }
        }
    }
</script>

<script>
    export let product;
</script>

<ProductDetail {product} />