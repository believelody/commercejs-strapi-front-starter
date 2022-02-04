<script>
    import {createEventDispatcher} from "svelte";

    export let name, items, defaultValue = "", hint, error, label = "", placeholder, required;
    let value = defaultValue;
    const dispatch = createEventDispatcher();

    $: {
        const selectedItem = items.find(item => item.value === value);
        if (selectedItem) {
            dispatch("value", selectedItem);
        }
    }
</script>

<div class="flex flex-col items-center py-3 px-2">
    <label
        for={name}
        class="flex items-center w-full"
    >
		<span class="sm:text-right mr-2">
			{label}
            {#if required}
				*
			{/if}
		</span>
        <input
            bind:value
            {name}
            type="text"
            id={name}
            list="list-{name}"
            class="border rounded grow focus:outline-none p-3"
            {placeholder}
        />
        <datalist id="list-{name}">
            {#each items as {value}}
                <option {value} />
            {/each}
        </datalist>
    </label>
    {#if hint}
        <span class="text-xs text-gray-400 italic">{hint}</span>
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