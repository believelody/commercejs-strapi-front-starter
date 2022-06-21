<script>
	import ProductList from '$components/products/ProductList.svelte';

	export let products, meta, error;
</script>

<ProductList {products} {meta} />
