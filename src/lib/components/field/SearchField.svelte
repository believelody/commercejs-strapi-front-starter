<script>
    import HidePasswordIcon from "../svg/HidePasswordIcon.svelte";
    import ShowPasswordIcon from "../svg/ShowPasswordIcon.svelte";
    import {createEventDispatcher} from "svelte";

    export let name, items, hint, label = "", placeholder, required;
    let value = "";
    const dispatch = createEventDispatcher();

    $: {
        const selectedItem = items.find(item => item.value === value);
        if (selectedItem) {
            dispatch("value", selectedItem);
        }
    }
</script>

<div class="flex flex-col items-center py-3 px-2 border-b border-gray-300 xl:border-none">
    <label
            for={name}
            class="flex items-center w-full"
    >
		<span class="sm:text-right xl:mr-2">
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
                class="flex-grow focus:outline-none text-center px-3 xl:px-0"
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
</div>

<style>
    * {
        box-sizing: border-box;
    }
</style>