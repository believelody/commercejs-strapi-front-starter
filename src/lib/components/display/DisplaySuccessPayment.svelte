<script>
	import { t } from '$lib/i18n';
    import CheckCircleIcon from '../svg/CheckCircleIcon.svelte';

    export let items, user, shipping, shippingMethod;

    $: console.log(shipping);
</script>

<div class="flex flex-col justify-center">
    <h3 class="flex items-center" id="modal-title">
        <span class="bg-green-100 rounded-full"><CheckCircleIcon size={12} /></span>
        <span class="ml-4 text-lg leading-6 font-medium text-gray-900">{$t('checkout.payment.success.title')}</span>
    </h3>
    <div class="mt-2">
        <p class="text-md text-gray-600">
            {$t("checkout.payment.success.subtitle")}
        </p>
        <ul class="text-md mt-3 text-gray-600 list-disc list-inside">
            {#each items as item}
                <li>{item.name} x {item.quantity} - {item.variants.map(variant => `${variant.variant_name} : ${variant.option_name}`).join(" , ")}</li>
            {/each}
        </ul>
    </div>
    <div class="mt-2">
        <h3 class="leading-6 font-medium">{$t("checkout.payment.success.identity")} : {user.firstname} {user.lastname}</h3>
        <h4 class="leading-6 text-gray-600">{$t("checkout.identity.email.label")} : {user.email}</h4>
    </div>
    <div class="mt-2">
        <section class="flex items-start justify-start text-md text-gray-600">
            <span>{$t("checkout.payment.success.shipping.title")} : </span>
            <span class="ml-2 underline">{shipping.address1} {shipping.address2}, {shipping.city} {shipping.zip}, {$t(`country.${shipping.country.toLowerCase()}`)}</span>
        </section>
    </div>
    <div class="mt-2">
        <p class="text-md text-gray-600">
            {$t("checkout.payment.success.shipping-method")} : {shippingMethod}
        </p>
    </div>
</div>
<div class="bg-gray-50 px-4 py-3 sm:px-6 sm:flex sm:flex-row-reverse">
	<button
		type="button"
		on:click={showCart}
		class="w-full inline-flex justify-center rounded-md border border-transparent shadow-sm px-4 py-2 bg-green-600 text-base font-medium text-white hover:bg-green-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-green-500 sm:ml-3 sm:w-auto sm:text-sm"
	>
		{$t("product.modal.cta.check-cart")}
	</button>
	<button
		type="button"
		on:click={() => $modal = null}
		class="mt-3 w-full inline-flex justify-center rounded-md border border-gray-300 shadow-sm px-4 py-2 bg-white text-base font-medium text-gray-700 hover:bg-gray-50 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-indigo-500 sm:mt-0 sm:ml-3 sm:w-auto sm:text-sm"
	>
		{$t("product.modal.cta.continue-shopping")}
	</button>
</div>

<style>
	/* your styles go here */
</style>