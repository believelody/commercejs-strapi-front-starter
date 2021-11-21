<script context="module">
    import api from '$lib/api'
    export async function load({ page }) {
        const { slug } = page.params;
        const { category } = await api.category.getCategories(slug);
        const { products, meta } = await api.category.getProductByCategory();

        return {
            props: { category, products, meta }
        }
    }
</script>

<script>
    import ProductList from "../../../lib/components/products/ProductList.svelte";

    export let category, products, meta;
</script>

<style>
    /* your styles go here */
</style>

<ProductList {products} />