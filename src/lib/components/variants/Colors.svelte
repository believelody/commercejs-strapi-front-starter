<script>
	import { createEventDispatcher } from 'svelte';

	export let colors;
	const dispatch = createEventDispatcher();

    function selectColor(color) {
        dispatch("selectedColor", color);
    }
</script>

<div class="flex">
	<span class="mr-3">{colors.name}</span>
	{#each colors.options as color}
		<button
			on:click={() => selectColor(color)}
			class="border-2 border-gray-300 ml-1
                {color.name === 'black' || color.name === 'white'
				? `bg-${color.name}`
				: `bg-${color.name}-500`}
                rounded-full w-6 h-6 focus:outline-none"
		/>
	{/each}
</div>
