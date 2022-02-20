<script>
	import { getContext } from 'svelte';
	import Button from '../../elements/button/Button.svelte';

	export let products,
		filteredProducts = products;
	const filters = getContext('filters');

	function applyFilter(key, value) {
		switch (key) {
			case 'prices':
				return products.filter((product) => product >= value[0] && product <= value[1]);
			default:
		}
	}

	$: {
		if (Object.values($filters).some((v) => v.length)) {
			Object.entries($filters).forEach(([k, v]) => {
				if (v.length) {
					filteredProducts = applyFilter(k, v);
				}
			});
		}
	}

	$: console.log(filteredProducts);
</script>

<h2>Nous avons trouvé {filteredProducts.length} articles.</h2>
<div class="product-list">
	{#each filteredProducts as item}
		<Button>
			<span>{item}</span>
		</Button>
	{/each}
</div>

<style>
	@import '../../../styles/tailwind.css';

	h2 {
		@apply py-4;
	}
	.product-list {
		@apply p-4 w-full grid grid-cols-8 items-center gap-4;
	}
</style>
