<script>
    export let value = "", name, hint, error, label = "", placeholder, required;
</script>

<div class={$$props.class}>
	<label
        for={name}
        class="flex flex-col items-start w-full"
	>
		{#if label}
            <span class="sm:text-right mr-2">
                {label}
                {#if required}
                    *
                {/if}
            </span>
        {/if}
        <textarea
            bind:value={value}
            {name}
            id={name}
            class="w-full border rounded p-3 focus:outline-none"
            {placeholder}
            rows={10}
        />
	</label>
	{#if hint}
		<span class="text-xs text-neutral-400 italic">{hint}</span>
	{/if}
    {#if error}
        <span class="text-xs text-red-400 italic">{error}</span>
    {/if}
</div>

<style>
	* {
		box-sizing: border-box;
	}
</style>