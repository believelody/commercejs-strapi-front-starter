<script>
	export let group, name, label, className, value;
</script>

<label
	for={name}
	class={className}
>
    <input
        type="radio"
        bind:group
        {name}
        id={name}
        {value}
        class="focus:outline-none px-3 xl:px-0"
    />
	<span class="sm:text-right px-2 xl:mr-2">{label}</span>
</label>

<style>
	/* your styles go here */
</style>
