<script>
	import { getContext } from 'svelte';
	import { t } from '$lib/i18n';
	import ColorList from './ColorList.svelte';
	import SizeList from './SizeList.svelte';

	export let variantGroup, selectedOption, type, shape;
	const variants = getContext('variants');

	function isAvailable(option) {
		const matchingVariants = $variants.filter(
			(variant) => variant.options[variantGroup.id] === option.id
		);
		return matchingVariants.every((variant) => variant.inventory < 1);
	}

	function selectListComponent(type) {
		switch (type) {
			case 'color':
				return ColorList;
			case 'size':
				return SizeList;
			default:
				return null;
		}
	}
</script>

<div class="flex items-center">
	<span class="mr-3 capitalize">{$t(`variants.${type}.name`)}</span>
	<div class="grid grid-cols-{variantGroup.options.length} items-center gap-4">
		<svelte:component
			this={selectListComponent(type)}
			items={variantGroup.options.map((option) => ({
				name: option.name,
				value: option,
				isDisabled: isAvailable(option)
			}))}
			on:selectOption
			selectedOptionName={selectedOption?.name}
			{shape}
		/>
	</div>
</div>
