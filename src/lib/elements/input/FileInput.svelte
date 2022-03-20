<script>
	import { createEventDispatcher } from "svelte";

	export let name, hint, label = "", placeholder, required, multiple = false, accept = "";
	let input;
    const dispatch = createEventDispatcher();

    function onInput() {
        const files = input.files;
        if (files.length) {
			dispatch("load", {files});
		}
    }
</script>

<div class="flex flex-col items-center py-3 px-2">
	<label
		for={name}
		class="flex items-center w-full"
	>
		<span class="sm:text-right xl:mr-2">
			{label}
			{#if required}
				*
			{/if}
		</span>
		<input
			{name}
			type="file"
            bind:this={input}
			id={name}
			{multiple}
			on:input={onInput}
			{accept}
			class="grow focus:outline-none px-3 xl:px-0"
			{placeholder}
		/>
	</label>
	{#if hint}
		<span class="text-xs text-neutral-400 italic">{hint}</span>
	{/if}
</div>

<style>
	* {
		box-sizing: border-box;
	}
</style>