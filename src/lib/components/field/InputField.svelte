<script>
	export let value, name, label, placeholder, type = "text", pattern, required;
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
		value={value || ""}
		{name}
		{type}
		{pattern}
        id={name}
		on:change
		class="flex-grow focus:outline-none px-3 xl:px-0"
		{placeholder}
	/>
</label>

<style>
	/* your styles go here */
</style>
