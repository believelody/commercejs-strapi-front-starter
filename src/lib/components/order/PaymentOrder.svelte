<script>
    import {t} from '$lib/i18n';
    import OrderAccordion from "../accordions/OrderAccordion.svelte";

    export let information, status;

    function selectPaymentStatusColor() {
        switch (status) {
            case "paid":
                return "success";
        
            default:
                return "black";
        }
    }
</script>

<style>
    /* your styles go here */
</style>

<OrderAccordion>
    <span slot="header">{$t("order.detail.payment.header")}</span>
    <section slot="content" class="flex flex-col items-center lg:flex-row flex-wrap">
        <div class="w-full lg:w-1/2">
            <span>{$t("order.detail.payment.content.status-payment")} : </span>
            <span class="text-{selectPaymentStatusColor()}">{$t(`order.detail.payment.content.${status}`)}</span>
        </div>
        <div class="w-full lg:w-1/2">
            <span>{$t("order.detail.payment.content.method")} : </span>
            <span class="italic font-medium">{$t(`order.detail.payment.content.${information.gateway}`)}</span>
        </div>
        {#if information.gateway === "stripe"}
            <div class="w-full lg:w-1/2">
                <span>{$t("order.detail.payment.content.card-type")} : </span>
                <span class="capitalize font-medium">{information.payment_source.brand}</span>
            </div>
            <div class="w-full lg:w-1/2">
                <span>{$t("order.detail.payment.content.last-card-digit")} : </span>
                <span>****{information.gateway_reference}</span>
            </div>
        {/if}
    </section>
</OrderAccordion>