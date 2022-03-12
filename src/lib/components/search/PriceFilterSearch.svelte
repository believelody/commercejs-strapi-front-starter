<script>
	import RangeSlider from 'svelte-range-slider-pips';
	import { t } from '$lib/i18n';
	import Card from '$elements/card/Card.svelte';
	import ColorList from '../list/ColorList.svelte';
import { getContext } from 'svelte';

	export let min = 0,
		max = 50;
    const filters = getContext("filters");
	$: pricemarks = Array.from({ length: max / 10 }, (v, i) => i * 10);
</script>

<Card>
	<h3 slot="header">{$t('common.price')}</h3>
	<div slot="content" class="range-wrapper">
		<RangeSlider
            values={[min, max]}
            {min}
            {max}
			pushy
            range
            float
            step={max / 10}
            pips
            first="label"
            last="label"
            suffix="€"
            on:change={({ detail }) => $filters = $filters.set("prices", detail.values)}
        />
	</div>
</Card>

<style>
	@import '../../../styles/tailwind.css';

	h3 {
		@apply p-4 border-b-2 border-neutral;
	}
	.range-wrapper {
		@apply p-4 flex-center-middle;
	}
	.range-wrapper span {
		@apply px-4 text-lg;
	}
	.range-wrapper input {
		@apply flex-grow;
	}

    :global(.rangeSlider) {
        width: 100%;
    }
</style>
