<script>
	import Button from '../../elements/button/Button.svelte';

	export let sizes, selectedSize;
</script>

{#each sizes as size}
	<Button class="{selectedSize === size ? 'border-2 border-neutral bg-transparent font-medium' : ''}" on:click={() => (selectedSize = size)}>
		<span class="uppercase">{size}</span>
	</Button>
{/each}

<style>
    @import "../../../styles/tailwind.css";

	.active {
        @apply border border-neutral bg-transparent;
    }
</style>
