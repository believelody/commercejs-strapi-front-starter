<script>
    import { t } from '$lib/i18n';
    import OrderAccordion from "../accordion/OrderAccordion.svelte";
    import InfoOrder from './InfoOrder.svelte';

    export let items, subtotal;
</script>

<style>
    /* your styles go here */
</style>

<OrderAccordion isOpen>
    <div slot="header" class="flex justify-between w-full">
        <span>{items.length} {$t(`order.detail.items.${items.length === 1 ? "singular" : "plural"}`)}</span>
        <span>{$t("common.total")} {subtotal.formatted_with_symbol}</span>
    </div>
    <ul slot="content" class="flex flex-col lg:flex-row">
        {#each items as item}
            <li class="flex w-full lg:w-1/2 border rounded m-1">
                <section class="w-1/2">
                    <img src={item.image.url} alt={item.name} class="w-full h-auto" />
                </section>
                <section class="w-1/2 flex flex-col px-1">
                    <InfoOrder {item} />
                </section>
            </li>
        {/each}
    </ul>
</OrderAccordion>