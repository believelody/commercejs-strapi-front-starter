<script>
	import { t } from '$lib/i18n'

	export let colors, selectedColor;

	function selectColor(color) {
		switch (color) {
			case "black":
			case "white":
				console.log(color);
				return `bg-${color}`;
			default:
				console.log(color);
				return `bg-${color}-600`;
		}
	}
</script>

<div class="flex items-center">
	<span class="mr-3">{$t("variants.color.name")}</span>
	<div class="grid grid-cols-3 items-center gap-2">
		{#each colors.options as color}
				<button
					on:click={() => selectedColor = color}
					class="
						{selectedColor.name === color.name ? 'border-2 border-gray-600 w-8 h-8' : 'border-none w-6 h-6'}
						{selectColor(color.name)}
						rounded-full
					"
				/>
		{/each}
	</div>
</div>
