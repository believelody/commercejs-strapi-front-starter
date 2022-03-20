<script>
    import { t } from '$lib/i18n';    
    import Star from "$elements/star/Star.svelte";
    import Dropdown from '$elements/dropdown/Dropdown.svelte';

    export let max = 5, value = 0;
</script>

<style>
    /* your styles go here */
</style>

<Dropdown>
    <svelte:fragment slot="header">
        {#if value > 0}
            <span class="cursor-pointer">
                <Star nb={value} />
            </span>
        {:else}
            <span class="italic text-neutral-500 cursor-pointer">{$t("common.star.placeholder")}</span>
        {/if}
    </svelte:fragment>
    <ul slot="content" class="absolute left-0 bg-white border">
        {#each Array(max) as star, index}
            <li class="px-2 py-1 hover:bg-neutral-200 cursor-pointer" on:click={() => value = index + 1}>
                <Star nb={index + 1} />
            </li>
        {/each}
    </ul>
</Dropdown>