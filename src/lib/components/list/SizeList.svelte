<script>
	import { createEventDispatcher } from 'svelte';
	import Button from '../../elements/button/Button.svelte';

	export let items, selectedOptionName;

	const dispatch = createEventDispatcher();
</script>

{#each items as item}
	<Button
		class="box-border {selectedOptionName === item.name && !item.isDisabled ? 'border-2 border-neutral bg-transparent font-medium' : 'text-neutral-dark'}"
		on:click={() => dispatch('selectOption', { selectedOption: { ...item.value, type : "size" } })}
		disabled={item.isDisabled}
	>
		<span>{item.name}</span>
	</Button>
{/each}

<style>
	@import '../../../styles/tailwind-output.css';

	.active {
		@apply border border-neutral bg-transparent;
	}
</style>
