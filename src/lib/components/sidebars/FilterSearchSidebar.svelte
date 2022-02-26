<script>
	import SidebarWrapper from '../../elements/sidebar/SidebarWrapper.svelte';
	import CategoryFilterSearch from '../search/CategoryFilterSearch.svelte';
	import ColorFilterSearch from '../search/ColorFilterSearch.svelte';
	import PriceFilterSearch from '../search/PriceFilterSearch.svelte';
	import SizeFilterSearch from '../search/SizeFilterSearch.svelte';
</script>

<SidebarWrapper>
	<section slot="content" class="content">
		<CategoryFilterSearch />
		<PriceFilterSearch />
		<ColorFilterSearch />
		<SizeFilterSearch />
	</section>
</SidebarWrapper>

<style>
	@import '../../../styles/tailwind.css';

	.content {
		@apply overflow-auto grid grid-cols-1 bg-neutral-light-1 gap-2;
	}
</style>
