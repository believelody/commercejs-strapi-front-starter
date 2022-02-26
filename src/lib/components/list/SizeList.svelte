<script>
	import { createEventDispatcher } from 'svelte';
	import Button from '../../elements/button/Button.svelte';

	export let items, selectedItem;

	const dispatch = createEventDispatcher();
</script>

{#each items as item}
	<Button
		class={selectedItem === item.name ? 'border-2 border-neutral bg-transparent font-medium' : ''}
		on:click={() => dispatch('selectSize', { selectedSize: item.value })}
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
