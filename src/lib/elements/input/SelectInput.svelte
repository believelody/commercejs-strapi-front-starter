<script>
	export let value, label, name, disabled, required;
</script>

<label
	for={name}
	class="{$$restProps.class} flex items-center"
>
	{#if label}
		<span class="text-right mr-2">{label} {required ? "*" : ""}</span>
	{/if}
	<select
		bind:value
		{disabled}
		id={name}
		{name}
		class="text-left grow border rounded py-2 {value ? "text-black" : "text-neutral-400"} bg-transparent cursor-pointer focus:outline-none"
	>
		<slot />                    
	</select>
</label>

<style>
	/* your styles go here */
</style>
