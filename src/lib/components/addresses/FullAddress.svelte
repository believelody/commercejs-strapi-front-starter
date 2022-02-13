<script>
    import { t } from '$lib/i18n';

    export let information;
</script>

<style>
    /* your styles go here */
</style>

<div class="flex flex-col">
    {#if information.title}
        <span>{information.title}</span>
    {/if}
    <span>{information.address1}</span>
    {#if information.address2}
        <span>{information.address2}</span>
    {/if}
    <span>{information.zip} {information.city}</span>
    {#if information.subdivision}
        <span>{information.subdivision.value}</span>
    {/if}
    <span>{$t(`country.${information.country.key.toLowerCase()}`)}</span>
</div>