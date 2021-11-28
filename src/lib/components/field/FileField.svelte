<script>
import { createEventDispatcher } from "svelte";


	export let name, hint, label = "", placeholder, required;
	let input;
    const dispatch = createEventDispatcher();
    function onInput(params) {
        const file = input.files[0];
        if (file) {
            const reader = new FileReader();
            reader.addEventListener("load", function () {
                dispatch("download", {image: reader.result});
            });
            reader.readAsDataURL(file);                    
        }
    }
</script>

<div class="flex flex-col xl:w-1/2 items-center py-3 px-2 border-b border-gray-300 xl:border-none">
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
			on:input={onInput}
			class="flex-grow focus:outline-none px-3 xl:px-0"
			{placeholder}
		/>
	</label>
	{#if hint}
		<span class="text-xs text-gray-400 italic">{hint}</span>
	{/if}
</div>

<style>
	* {
		box-sizing: border-box;
	}
</style>