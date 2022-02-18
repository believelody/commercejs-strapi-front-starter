<script>
	export let collapse = false;

	function onKeydown(e) {
		if (e.key === 'Escape' && collapse) {
			collapse = false;
		}
	}
</script>

<svelte:window on:keydown={onKeydown} />

<div class="relative {$$props.class}" on:mouseleave={() => collapse = false}>
	<button on:click={() => (collapse = !collapse)}>
		<slot name="header" />
	</button>
	{#if collapse}
		<div class="absolute z-50" on:click={() => (collapse = false)}>
			<slot name="content" />
		</div>
	{/if}
</div>

<style>
	/* your styles go here */
</style>
