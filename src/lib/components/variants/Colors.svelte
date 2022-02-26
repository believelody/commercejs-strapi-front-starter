<script>
	import { t } from '$lib/i18n';
	import ColorList from '../list/ColorList.svelte';

	export let colors, selectedColor;
</script>

<div class="flex items-center">
	<span class="mr-3">{$t('variants.color.name')}</span>
	<div class="grid grid-cols-3 items-center gap-4">
		<ColorList
			items={colors.map((color) => ({ name: color.name, value: color }))}
			on:selectColor={ ({ detail }) => selectedColor = detail.selectedColor }
			selectedItem={ selectedColor.name }
			shape="circle"
		/>
	</div>
</div>
