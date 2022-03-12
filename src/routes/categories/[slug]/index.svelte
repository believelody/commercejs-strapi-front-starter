<script context="module">
    import api from '$api'
import HeaderTitle from '../../$components/header/HeaderTitle.svelte';
    export async function load({ params }) {
        const { slug } = params;
        const { category } = await api.category.getOneBySlug(slug);
        const { products, meta } = await api.category.getProductByCategory(slug);

        return {
            props: { category, products, meta }
        }
    }
</script>

<script>
    import ProductList from "../../$components/products/ProductList.svelte";

    export let category, products = [], meta;
</script>

<style>
    /* your styles go here */
</style>

<HeaderTitle textSize="4xl" title={category.name} />
{#if category.description}
    {@html category.description}
{/if}
<ProductList {products} {meta} withoutPadding />