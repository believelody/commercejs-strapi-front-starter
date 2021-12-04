<script>
    import { t } from '$lib/i18n';
import CheckCircleIcon from '../svg/CheckCircleIcon.svelte';

    export let information, loading = null, callback1, callback2, callback1Text, callback2Text, isSelected = false;
</script>

<style>
    /* your styles go here */
</style>

{#if information.title}
    <span>{information.title}</span>
{/if}
<span>{information.address1}</span>
{#if information.address2}
    <span>{information.address2}</span>
{/if}
<span>{information.zip} {information.city}</span>
<span>{$t(`country.${information.country.key.toLowerCase()}`)}</span>
<div class="pt-3 flex flex-col lg:flex-row items-center justify-center">
    <button disabled={loading} on:click={callback1} class="bg-indigo-300 py-1 px-3 mr-0 {isSelected ? "" : "lg:mr-6"} mb-4 lg:mb-0 rounded disabled:opacity-75 disabled:cursor-wait">
        {callback1Text}
    </button>
    {#if isSelected}
        <span class="absolute bottom-0 right-0 rounded-full p-2">
            <CheckCircleIcon size={6} />
        </span>
    {:else}
        <button disabled={loading} on:click={callback2} class="bg-indigo-400 py-1 px-3 ml-0 lg:ml-6 rounded disabled:opacity-75 disabled:cursor-wait">
            {callback2Text}
        </button>
    {/if}
</div>