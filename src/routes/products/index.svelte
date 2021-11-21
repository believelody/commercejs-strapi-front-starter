<script context="module">
    import api from '$lib/api';

	export async function load() {
		const { products, meta } = await api.product.getProducts();
		return {
			props: { products, meta }
		};
	}
</script>

<script>
	import ProductList from '$lib/components/products/ProductList.svelte';

	export let products, meta;
</script>

<ProductList {products} />
