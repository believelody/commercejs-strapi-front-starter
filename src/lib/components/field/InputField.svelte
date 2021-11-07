<script>
	export let value, name, label, placeholder;
</script>

<label
	for={name}
	class="flex xl:w-1/2 items-center py-3 px-0 xl:px-2 border-b border-gray-300 xl:border-none"
>
	<span class="sm:text-right px-2 xl:mr-2">{label}</span>
	<input
		bind:value
		{name}
        id={name}
		class="focus:outline-none px-3 xl:px-0"
		{placeholder}
	/>
</label>

<style>
	/* your styles go here */
</style>
