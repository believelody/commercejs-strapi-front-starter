<script>
    import { t } from '$lib/i18n';
    import { checkout } from '$lib/stores';
</script>

<style>
    /* your styles go here */
</style>

<div class="flex justify-between items-start py-4 text-neutral-dark">
    <span>{$t('discount.label')}</span>
    {#if typeof $checkout.live.discount === "object" && !Array.isArray($checkout.live.discount)}
        <span class="font-semibold text-indigo-500">{$checkout.live.discount.code} - {$checkout.live.discount.value}{$checkout.live.discount.type === "percentage" ? "%" : "€"}</span>
    {:else}
        <span class="font-semibold italic text-sm text-neutral-400">{$t("discount.empty")}</span>
    {/if}
</div>