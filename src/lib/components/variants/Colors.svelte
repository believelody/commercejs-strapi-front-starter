<script>
	import { createEventDispatcher } from 'svelte';
	import { t } from '$lib/i18n'

	export let colors;
	const dispatch = createEventDispatcher();

    function selectColor(color) {
        dispatch("selectedColor", color);
    }
</script>

<div class="flex">
	<span class="mr-3">{$t("variants.color.name")}</span>
	{#each colors.options as color}
		<button
			on:click={() => selectColor(color)}
			class="border-2 border-gray-300 ml-1
                {color.name === 'black' || color.name === 'white'
				? `bg-${color.name}`
				: `bg-${color.name}-500`}
                rounded-full w-6 h-6
				focus:border-white"
		/>
	{/each}
</div>
