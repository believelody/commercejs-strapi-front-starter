<script>
    import { getContext } from 'svelte';
    import { t } from '$lib/i18n';
    import OrderContactModal from '../modal/OrderContactModal.svelte';

    export let reference, customer, orderId;
    const { open } = getContext("simple-modal");

    function openModal() {
        open(OrderContactModal, { reference, customer, orderId });
    }
</script>

<style>
    /* your styles go here */
</style>

<button on:click={openModal} class="underline">{$t("order.detail.contact")}</button>