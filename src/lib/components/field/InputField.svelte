<script>
	export let value, name, label, placeholder, type = "text", required;
</script>

<label
	for={name}
	class="flex xl:w-1/2 items-center py-3 px-2 border-b border-gray-300 xl:border-none"
>
	<span class="sm:text-right xl:mr-2">
		{label}
		{#if required}
			*
		{/if}
	</span>
	<input
		value={value ?? ""}
		{name}
		{type}
        id={name}
		on:input
		on:blur
		class="flex-grow focus:outline-none px-3 xl:px-0"
		{placeholder}
	/>
</label>

<style>	
	/* Chrome, Safari, Edge, Opera */
	input::-webkit-outer-spin-button,
	input::-webkit-inner-spin-button {
		-webkit-appearance: none;
		margin: 0;
	}

	/* Firefox */
	input[type='number'] {
		-moz-appearance: textfield;
	}
</style>
