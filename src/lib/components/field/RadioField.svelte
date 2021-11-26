<script>
	export let name, id, group, label = "", className, value;
</script>

<label class={className}>
    <input
        type="radio"
        on:change
        bind:group
        {name}
        id={id || name}
        {value}
        class="focus:outline-none px-3 xl:px-0"
    />
    {#if $$slots.default}
        <slot />
    {:else}
	    <span class="sm:text-right px-2 xl:mr-2">
            {label}
        </span>
    {/if}
</label>

<style>
	/* your styles go here */
</style>
