<script>
	import { createEventDispatcher } from 'svelte';
	import Button from '../../elements/button/Button.svelte';

	export let items, selectedItem;

	const dispatch = createEventDispatcher();
</script>

{#each items as item}
	<Button
		class={selectedItem === item.name && !item.isDisabled ? 'border-2 border-neutral bg-transparent font-medium' : 'text-neutral'}
		on:click={() => dispatch('selectSize', { selectedSize: item.value })}
		disabled={item.isDisabled}
	>
		<span class="uppercase">{item.name}</span>
	</Button>
{/each}

<style>
	@import '../../../styles/tailwind.css';

	.active {
		@apply border border-neutral bg-transparent;
	}
</style>
