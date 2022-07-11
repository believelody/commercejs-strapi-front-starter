<script>
	import { session } from "$app/stores";
	import ProductList from '$components/products/ProductList.svelte';

	export let products = [],
		meta,
		error;
</script>

<ProductList {products} {meta} />
