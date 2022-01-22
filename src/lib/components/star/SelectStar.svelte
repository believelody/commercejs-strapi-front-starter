<script>
    import { t } from '$lib/i18n';    
    import Star from "./Star.svelte";

    export let max = 5, value = 0, collapse = false;;
</script>

<style>
    /* your styles go here */
</style>

<div class="relative {$$props.class}" on:click={() => collapse = !collapse}>
    {#if value > 0}
        <span class="cursor-pointer">
            <Star nb={value} />
        </span>
    {:else}
        <span class="italic text-gray-500 cursor-pointer">{$t("common.star.placeholder")}</span>
    {/if}
    {#if collapse}
        <ul class="absolute left-0 bg-white border">
            {#each Array(max) as star, index}
            <li class="px-2 py-1 hover:bg-gray-200 cursor-pointer" on:click={() => value = index + 1}>
                <Star nb={index + 1} />
            </li>
        {/each}
        </ul>
    {/if}
</div>