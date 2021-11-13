<script>
	import { t } from '$lib/i18n'

	export let colors, selectedColor;
	$: console.log(selectedColor);
</script>

<div class="flex items-center">
	<span class="mr-3">{$t("variants.color.name")}</span>
	{#each colors.options as color}
		<button
			on:click={() => selectedColor = color}
			class="{selectedColor.name === color.name ? "border-2 border-gray-600 w-8 h-8" : "border-none w-6 h-6"} ml-1
                {color.name === 'black' || color.name === 'white'
				? `bg-${color.name}`
				: `bg-${color.name}-500`}
                rounded-full"
		/>
	{/each}
</div>
