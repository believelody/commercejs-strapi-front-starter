<script>
    import { onMount } from 'svelte';
    import { navigating, page } from '$app/stores';
    import { t } from '$lib/i18n';
    import api from '$lib/api';
    import { localDateFromSeconds } from '$lib/utils/date.util';
    import MoonLoading from '../../../lib/components/loading/MoonLoading.svelte';
    import HeaderTitle from '../../../lib/components/header/HeaderTitle.svelte';
    import ItemsOrderList from '../../../lib/components/order/ItemsOrderList.svelte';
    import DeliveryOrder from '../../../lib/components/order/DeliveryOrder.svelte';
    import ReOrderButton from '../../../lib/components/buttons/ReOrderButton.svelte';
    import InvoicePDFViewerButton from '../../../lib/components/buttons/InvoicePDFViewerButton.svelte';
    import AddressesOrder from '../../../lib/components/order/AddressesOrder.svelte';
    import PaymentOrder from '../../../lib/components/order/PaymentOrder.svelte';
    import ContactOrderButton from '../../../lib/components/buttons/ContactOrderButton.svelte';
    
    let data = null, error = null;

    async function getOrder() {
        const res = await api.order.getOne($page.params.reference);
        if (res.success) {
            data = res.data;
        } else {
            error = res.error
        }
    }

    onMount(async () => {
        if (!data) {
            await getOrder();
        }
    });
</script>

<style>
    /* your styles go here */
</style>

{#if $navigating || !data}
    <MoonLoading />
{:else}
    <HeaderTitle title={`${$t("order.detail.reference")} ${data.customer_reference}`} />
    <div class="px-2 lg:px-4 w-full h-full relative">
        <h4 class="bg-white py-2 rounded shadow-md text-center">
            {$t("order.detail.date")} : {localDateFromSeconds(data.created)}
        </h4>
        <div class="flex flex-wrap lg:justify-between my-6">
            <div class="mb-2 lg:mb-0 flex justify-center w-full lg:w-auto"><ReOrderButton order={data.order} /></div>
            <div class="flex justify-center w-full lg:w-auto"><InvoicePDFViewerButton {data} /></div>
        </div>
        <ItemsOrderList items={data.order.line_items} subtotal={data.order.subtotal} />
        <DeliveryOrder information={{...data.order.shipping, fulfillment: data.status_fulfillment}} />
        <AddressesOrder shipping={data.shipping} billing={data.billing} />
        <PaymentOrder information={data.transactions[0]} status={data.status_payment} />
        <div class="w-full text-right relative bottom-0 right-4 mt-4">
           <ContactOrderButton orderId={data.id} customer={data.customer} reference={data.customer_reference} />
        </div>
    </div>
{/if}