<script>
	export let value, name, label = "", placeholder, type = "text", required;
	let error, complete = false;

	function onBlur(e) {
		
	}
</script>

<label
	for={name}
	class="flex xl:w-1/2 items-center py-3 px-2 {complete ? "border-2 border-green-400 rounded" : error ? "border-2 border-red-400 rounded" : "border-b border-gray-300"} xl:border-none"
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
		on:blur={onBlur}
		class="flex-grow focus:outline-none px-3 xl:px-0"
		{placeholder}
	/>
</label>

<style>
	* {
		box-sizing: border-box;
	}
</style>