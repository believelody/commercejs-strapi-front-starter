<script>
	import { getContext } from 'svelte';
	import { t } from '$lib/i18n';
	import Card from '../../elements/card/Card.svelte';
	import ColorList from '../list/ColorList.svelte';
	import { toggleFilterSelection } from "$lib/utils/product.util";

	let colors = ['red', 'black', 'green', 'indigo', 'yellow', 'blue'];
	const filters = getContext("filters");
	$: selectedColor = $filters.get("color") ?? "";

	function selectColor(color) {
		$filters = toggleFilterSelection($filters, "color", color);
		if (!$filters.has("color")) {
			selectedColor = "";
		} else {
			selectedColor = color;
		}
	}
</script>

<Card>
	<h3 slot="header">{$t('variants.color.name')}</h3>
	<div slot="content" class="flex-center-middle mx-auto">
		<div class="color-list">
			<ColorList
				items={colors.map(c => ({ name: c, value: c }))}
				selectedItem={ selectedColor }
				on:selectColor={({ detail }) => selectColor(detail.selectedColor)}
				shape="circle"
			/>
		</div>
	</div>
</Card>

<style>
	@import '../../../styles/tailwind.css';

	h3 {
		@apply p-4 border-b-2 border-neutral;
	}
	.color-list {
		@apply p-4 flex items-center justify-start flex-wrap gap-x-12 gap-y-4;
	}
</style>
