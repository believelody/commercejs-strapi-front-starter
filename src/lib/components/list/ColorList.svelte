<script>
	import { createEventDispatcher } from 'svelte';

	export let items,
		selectedOptionName,
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

{#each items as item}
	<button
		on:click={() => dispatch('selectOption', { selectedOption: { ...item.value, type : "color" }})}
		class="
			box-border w-12 h-12
            {selectedOptionName === item.name && !item.isDisabled
			? `border-8 ${applyBorderColor(item.name)}`
			: `border-none ${applyBackgroundColor(item.name)}`}
            {applyShape()}
			disabled:opacity-50 disabled:cursor-not-allowed
        "
		disabled={item.isDisabled}
	/>
{/each}

<style>
	/* your styles go here */
</style>
