<script>
	export let value, label, name, disabled, required;
</script>

<label
	for={name}
	class="{$$restProps.class} flex items-center"
>
	<span class="text-right mr-2">{label} {required ? "*" : ""}</span>
	<select
		bind:value
		{disabled}
		id={name}
		{name}
		class="text-left flex-grow border rounded py-2 {value ? "text-black" : "text-gray-400"} bg-transparent cursor-pointer focus:outline-none"
	>
		<slot />                    
	</select>
</label>

<style>
	/* your styles go here */
</style>
