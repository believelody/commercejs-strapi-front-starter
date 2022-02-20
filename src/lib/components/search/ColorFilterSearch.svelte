<script>
	import { t } from '$lib/i18n';
	import Card from '../../elements/card/Card.svelte';
	import ColorList from '../list/ColorList.svelte';

	let colors = ['red', 'black', 'green', 'indigo', 'yellow', 'blue'],
		selectedColor;
</script>

<Card>
	<h3 slot="header">{$t('variants.color.name')}</h3>
	<div slot="content" class="flex-center-middle mx-auto">
		<div class="color-list">
			<ColorList {colors} {selectedColor} shape="circle" />
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
