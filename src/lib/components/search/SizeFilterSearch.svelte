<script>
	import { t } from '$lib/i18n';
	import Button from '../../elements/button/Button.svelte';
	import Card from '../../elements/card/Card.svelte';
	import SizeList from '../list/SizeList.svelte';

	let sizes = ['xs', 's', 'm', 'l', 'xl', 'xxl'],
		selectedSize;
</script>

<Card>
	<h3 slot="header">{$t('variants.size.name')}</h3>
	<div slot="content" class="size-list">
		<SizeList {sizes} {selectedSize} />
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
