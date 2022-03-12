<script context="module">
    import api from '$api';

	export async function load() {
		const res = await api.product.getAll();

        if (res.error) {
            return {
                props: { error: res.error }
            }
        }
		return {
			props: { products: res.products, meta: res.meta }
		};
	}
</script>

<script>
	import ProductList from '$components/products/ProductList.svelte';

	export let products, meta, error;
</script>

<ProductList {products} {meta} />
