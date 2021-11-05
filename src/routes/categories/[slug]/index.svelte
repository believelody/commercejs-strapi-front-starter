<script context="module">
import { baseUrl } from "../../../lib/utils/url.util";


    export async function load({ fetch, page }) {
        try {
            const { slug } = page.params;
            const categoryRes = await fetch(`${baseUrl}/categories/${slug}`);
            const { category } = await categoryRes.json();
            const productsRes = await fetch(`${baseUrl}/products/category/${slug}`);
            const { products, meta } = await productsRes.json();

            return {
                props: { category, products, meta }
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
    import ProductList from "../../../lib/components/products/ProductList.svelte";

    export let category, products, meta, error;
</script>

<style>
    /* your styles go here */
</style>

<ProductList {products} />