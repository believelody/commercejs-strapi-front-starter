<script>
    import { getContext } from 'svelte';
    import { t } from '$lib/i18n';
    import { openOrderContactModal } from '../../context/modal';

    export let reference, customer, orderId;
    const { open } = getContext("simple-modal");
</script>

<style>
    /* your styles go here */
</style>

<button on:click={() => openOrderContactModal(open, { reference, customer, orderId })} class="underline">{$t("order.detail.contact")}</button>