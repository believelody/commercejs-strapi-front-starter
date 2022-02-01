<script>
    export let name, checked, label, labelBeforeCheckbox = false, required = false;
</script>

<label class="flex items-center {$$props.class}" for={name}>
    {#if labelBeforeCheckbox}
        <span class="px-2 text-gray-600">
            {label ?? ""}
            {#if required}
                *
            {/if}
        </span>
    {/if}
    <input id={name} {name} type="checkbox" bind:checked />
    {#if !labelBeforeCheckbox}
        <span class="px-2 text-gray-600">
            {label ?? ""}
            {#if required}
                *
            {/if}
        </span>
    {/if}
</label>