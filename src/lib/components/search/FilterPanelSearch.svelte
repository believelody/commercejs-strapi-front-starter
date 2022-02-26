<script>
	import { getContext } from 'svelte';
	import { t } from '$lib/i18n';
	import { media } from "$lib/stores";
	import Accordion from '../../elements/accordion/Accordion.svelte';
	import { openSidebar } from '../../elements/sidebar/Sidebar.svelte';
	import FilterSearchSidebar from '../sidebars/FilterSearchSidebar.svelte';
	import CategoryFilterSearch from './CategoryFilterSearch.svelte';
	import ColorFilterSearch from './ColorFilterSearch.svelte';
	import PriceFilterSearch from './PriceFilterSearch.svelte';
	import SizeFilterSearch from './SizeFilterSearch.svelte';
	import SettingsIcon from '../../elements/icon/SettingsIcon.svelte';

	const filters = getContext('filters');
	function openFilterSearchSidebar() {
		openSidebar({
			component: FilterSearchSidebar,
			props: {
				filters
			},
			options: {
				openFrom: $media.mobile ? 'top' : 'right'
			}
		});
	}
</script>

<section class="content">
	<CategoryFilterSearch />
	<PriceFilterSearch />
	<ColorFilterSearch />
	<SizeFilterSearch />
</section>

<h3 class="sidebar-trigger" on:click={openFilterSearchSidebar}>
	<span>{$t('product.search.page.filters.sidebar-btn.label')}</span>
	<SettingsIcon />
</h3>

<style>
	@import '../../../styles/tailwind.css';

	.content {
		@apply hidden lg:grid lg:grid-cols-1 lg:gap-2;
	}

	.sidebar-trigger {
		@apply lg:hidden bg-white py-2 flex-center-middle gap-x-4 shadow-md;
	}
</style>
