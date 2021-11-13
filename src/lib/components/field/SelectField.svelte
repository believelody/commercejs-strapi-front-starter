<script>
	export let value, label, name, disabled;
</script>

<label
	for={name}
	class={$$restProps.class}
>
	<span class="text-right px-2 xl:px-0 xl:mr-2">{label}</span>
	<div id={name} class="focus:outline-none px-3 xl:px-0 flex flex-grow items-center">
		<select
            bind:value
			{disabled}
            {name}
            class="text-center {value ? "text-black" : "text-gray-400"} flex-grow bg-transparent flex-grow cursor-pointer focus:outline-none"
        >
            <slot name="items" />                    
        </select>
	</div>
</label>

<style>
	/* your styles go here */
</style>
