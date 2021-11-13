<script>
    import { t } from '$lib/i18n';
    import { shipping, checkout, checkoutLoading, shippingMethod } from '$lib/stores'
    import { chooseShippingMethod } from '$lib/actions/checkout';
    import RadioField from "../field/RadioField.svelte";

    async function selectShippingMethod(id) {
        $checkoutLoading = true;
        await chooseShippingMethod($checkout.id, id, $shipping.country);
        $checkoutLoading = false;
    }
</script>

<style>
    /* your styles go here */
</style>

<div class="mx-2 md:mx-12 rounded-md mb-8">
    <h2 class="uppercase tracking-wide text-lg font-semibold text-gray-700 my-2">
		{$t("checkout.shipping-methods.title")}
	</h2>
    <fieldset class="mb-3 px-4 bg-white shadow-lg rounded text-gray-600 flex justify-around">
        {#each $checkout.shipping_methods as method}
            <RadioField
                label={`${method.description} - ${method.price.formatted_with_symbol}`}
                name="shippingMethod"
                value={method}
                on:change={() => selectShippingMethod(method.id)}
                className="flex xl:w-1/2 items-center py-3 px-0 xl:px-2"
            />
        {/each}
    </fieldset>
</div>