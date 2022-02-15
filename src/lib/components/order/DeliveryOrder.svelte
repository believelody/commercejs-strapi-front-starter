<script>
    import {t} from '$lib/i18n';
    import OrderAccordion from "../accordions/OrderAccordion.svelte";

    export let information;

    function selectFulfillmentStatus() {
        switch (information.fulfillment) {
            case "not_fulfilled":
                return "order.account.table.body.not-fulfill";
        
            default:
                return "common.no-translation";
        }
    }
</script>

<style>
    /* your styles go here */
</style>

<OrderAccordion>
    <span slot="header">{$t("order.detail.delivery.header")}</span>
    <section slot="content" class="block">
        <div class="flex flex-col items-center lg:flex-row flex-wrap pb-4">
            <span class="w-full lg:w-1/2">{$t("order.detail.delivery.content.method")} : {information.description}</span>
            <span class="w-full lg:w-1/2">{$t("order.detail.delivery.content.cost")} : {information.price.formatted_with_symbol}</span>
            <span class="w-full lg:w-1/2">{$t("order.detail.delivery.content.delivery-time")} : {$t(`delivery.method.${information.description.toLowerCase()}.description`)}</span>
            <span class="w-full lg:w-1/2">{$t("order.detail.delivery.content.fulfillment")} : {$t(selectFulfillmentStatus())}</span>
        </div>
        <div class="border-t pt-2 flex justify-center text-lg">
            <span>{$t("order.detail.delivery.content.tracking")} :</span>
            <span class="ml-3 italic text-gray-500">{$t("order.detail.delivery.content.no-tracking")}</span>
        </div>
    </section>
</OrderAccordion>