<script context="module">
    import api from '$api'
    export async function load() {
        const { categories, meta } = await api.category.getAll();

        return {
            props: { categories, meta }
        }
    }
</script>

<script>
    import ProductList from "../$components/products/ProductList.svelte";

    export let categories, meta;
</script>

<style>
    /* your styles go here */
</style>