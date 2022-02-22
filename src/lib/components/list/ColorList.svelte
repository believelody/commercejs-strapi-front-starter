<script>
	import { createEventDispatcher } from 'svelte';

	export let colors,
		selectedColor,
		shape = 'rounded';
	const dispatch = createEventDispatcher();

	function applyBackgroundColor(color) {
		switch (color) {
			case 'white':
			case 'black':
				return `bg-${color}`;
			case 'red':
				return `bg-danger`;
			case 'green':
				return `bg-success`;
			case 'blue':
				return `bg-info`;
			case 'yellow':
				return `bg-warning`;
			case 'indigo':
				return `bg-purple-500`;
			default:
				return 'bg-transparent';
		}
	}

	function applyShape() {
		switch (shape) {
			case 'circle':
				return 'rounded-full';
			case 'square':
				return 'rounded-none';
			case 'rounded':
			default:
				return 'rounded';
		}
	}

	function applyBorderColor(color) {
		switch (color) {
			case 'white':
			case 'black':
				return `border-${color}`;
			case 'red':
				return `border-danger`;
			case 'green':
				return `border-success`;
			case 'blue':
				return `border-info`;
			case 'yellow':
				return `border-warning`;
			case 'indigo':
				return `border-purple-500`;
			default:
				return 'border-neutral';
		}
	}
</script>

{#each colors as color}
	<button
		on:click={() => dispatch('selectColor', { selectedColor: color })}
		class="
            {selectedColor === color
			? `box-border border-8 w-16 h-16 ${applyBorderColor(color)}`
			: `border-none w-12 h-12 ${applyBackgroundColor(color)}`}
            {applyShape()}
        "
	/>
{/each}

<style>
	/* your styles go here */
</style>
