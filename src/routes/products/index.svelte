<script context="module">
	import { baseUrl } from '$lib/utils/url.util';

	export async function load({ fetch }) {
		try {
			const res = await fetch(`${baseUrl}/products/category/pets`);
			const { products, meta } = await res.json();
			return {
				props: { products, meta }
			};
		} catch (error) {
			console.log(error);
			return { props: { error } };
		}
	}
</script>

<script>
	import { resettingStores, resetStores } from '$lib/stores';
	import ProductList from '$lib/components/products/ProductList.svelte';
	import { onMount } from 'svelte';

	export let products, meta, error;

	onMount(() => {
		if ($resettingStores) {
			resetStores();
		}
	});
</script>

<ProductList {products} />
