<script>
	import { t } from '$lib/i18n';
    import { resetStores } from '$lib/stores';
    import CheckCircleIcon from '../svg/CheckCircleIcon.svelte';
    import {getContext} from "svelte";
import FullAddress from './FullAddress.svelte';

    export let live, user, shipping, billing, isBillingSameAsShipping, reference;
    let dataUser = user;
    const { close } = getContext("simple-modal");

    function closeModal() {
        resetStores();
        close();
    }
</script>

<div>
    <div class="flex flex-col justify-center">
        <h3 class="flex items-center border-b border-gray-200 pb-2" id="modal-title">
            <span class="bg-emerald-100 rounded-full"><CheckCircleIcon size={12} /></span>
            <span class="ml-4 text-lg leading-6 font-medium text-gray-900">{$t('checkout.payment.success.title')}</span>
        </h3>
        <h3 class="mt-2 w-full text-lg leading-6 text-gray-800">
            {$t("checkout.payment.success.order-reference", { name: `${dataUser.firstname} ${dataUser.lastname}`, reference })}
        </h3>
        <div class="mt-2">
            <p class="text-md text-gray-600">
                {$t("checkout.payment.success.subtitle")}
            </p>
            <ul class="text-md text-gray-600 list-disc list-inside">
                {#each live.line_items as item}
                    <li>{item.name} x {item.quantity} - {item.variants.map(variant => `${variant.variant_name} : ${variant.option_name}`).join(" , ")}</li>
                {/each}
            </ul>
            <p class="text-md text-gray-600">
                {$t("checkout.payment.success.subtotal")} : {live.subtotal.formatted_with_symbol}
            </p>
        </div>
        <div class="my-2 flex justify-start">
            <section class="text-gray-600 mr-4">{$t(`checkout.payment.success.${isBillingSameAsShipping ? "shipping-billing" : "shipping"}.title`)} : </section>
            <section class="flex flex-col grow text-md text-gray-600">
                <FullAddress information={$shipping} />
            </section>
        </div>
        {#if !isBillingSameAsShipping}
            <div class="mt-2 flex justify-start">
                <section class="text-gray-600 mr-4">{$t(`checkout.payment.success.billing.title`)} : </section>
                <section class="flex flex-col grow text-md text-gray-600">
                    <FullAddress information={$billing} />
                </section>
            </div>
        {/if}
        <div class="mt-2">
            <p class="text-md text-gray-600">
                {$t("checkout.payment.success.shipping-method")} : {live.shipping.description}
            </p>
            <p class="text-md text-gray-600">
                {$t("checkout.payment.success.shipping-cost")} : {live.shipping.price.formatted_with_symbol}
            </p>
        </div>
        <div class="mt-2 pt-2 border-t border-gray-200">
            <p class="text-lg text-center font-medium text-gray-600">
                {$t("checkout.payment.success.total")} : {live.total.formatted_with_symbol}
            </p>
        </div>
    </div>
    <div class="bg-gray-50 px-4 py-3 sm:px-6 flex justify-center">
        <button
            on:click={closeModal}
            class="mt-3 w-full inline-flex justify-center rounded-md border border-gray-300 shadow-sm px-4 py-2 bg-white text-base font-medium text-gray-700 hover:bg-gray-50 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-indigo-500 sm:mt-0 sm:ml-3 sm:w-auto sm:text-sm"
        >
            {$t("checkout.payment.success.modal.close")}
        </button>
    </div>
</div>

<style>
	/* your styles go here */
</style>