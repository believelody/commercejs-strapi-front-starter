<script>
	import { t } from '$lib/i18n';
	import SizeList from '../list/SizeList.svelte';

	export let sizes, selectedSize;
</script>

<div class="flex items-center">
	<span class="mr-3">{$t('variants.size.name')}</span>
	<div class="grid grid-cols-3 items-center gap-4">
		<SizeList
			items={sizes.map((s) => ({ name: s.name, value: s }))}
			on:selectSize={({ detail }) => (selectedSize = detail.selectedSize)}
			selectedItem={selectedSize.name}
		/>
	</div>
</div>
