<script>
	import Accordion from '../../elements/accordion/Accordion.svelte';

	import CategoryFilterSearch from './CategoryFilterSearch.svelte';
	import ColorFilterSearch from './ColorFilterSearch.svelte';
	import PriceFilterSearch from './PriceFilterSearch.svelte';
	import SizeFilterSearch from './SizeFilterSearch.svelte';
</script>

<section class="hidden lg:block">
	<CategoryFilterSearch />
	<PriceFilterSearch />
	<ColorFilterSearch />
	<SizeFilterSearch />
</section>

<Accordion class="lg:hidden bg-white w-full shadow-md">
	<h3 slot="header">Filtres</h3>
	<div class="content" slot="content">
		<CategoryFilterSearch />
		<PriceFilterSearch />
		<ColorFilterSearch />
		<SizeFilterSearch />
	</div>
</Accordion>

<style>
	@import '../../../styles/tailwind.css';

	.content {
		@apply grid grid-cols-1 md:grid-cols-2 md:gap-1 md:p-1;
	}
</style>
