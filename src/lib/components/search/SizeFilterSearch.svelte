<script>
	import { getContext } from 'svelte';
	import { t } from '$lib/i18n';
	import Button from '../../elements/button/Button.svelte';
	import Card from '../../elements/card/Card.svelte';
	import SizeList from '../list/SizeList.svelte';
	import { toggleFilterSelection } from '$lib/utils/product.util';

	let sizes = ['xs', 's', 'm', 'l', 'xl', 'xxl'],
		selectedSize;

	const filters = getContext('filters');

	function selectSize(size) {
		$filters = toggleFilterSelection($filters, 'size', size);
		if (!$filters.has('size')) {
			selectedSize = '';
		} else {
			selectedSize = size;
		}
	}
</script>

<Card>
	<h3 slot="header">{$t('variants.size.name')}</h3>
	<div slot="content" class="size-list">
		<SizeList
			items={sizes.map(s => ({ name: s, value: s }))}
			selectedItem={selectedSize}
			on:selectSize={({ detail }) => selectSize(detail.selectedSize)}
		/>
	</div>
</Card>

<style>
	@import '../../../styles/tailwind.css';

	h3 {
		@apply p-4 border-b-2 border-neutral;
	}
	.size-list {
		@apply p-4 grid grid-cols-4 grid-flow-row-dense items-center gap-x-12 gap-y-4;
	}
</style>
