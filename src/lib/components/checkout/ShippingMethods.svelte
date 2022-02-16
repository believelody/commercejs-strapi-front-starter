<script>
    import { t } from '$lib/i18n';
    import { shipping, checkout, checkoutLoading } from '$lib/stores'
    import api from '$lib/api';
    import Radio from "../../elements/input/RadioInput.svelte";

    async function selectShippingMethod(id) {
        $checkoutLoading = true;
        await api.checkout.chooseShippingMethod($checkout.id, id, $shipping.country.key);
        $checkoutLoading = false;
    }
</script>

<style>
    /* your styles go here */
</style>

<div class="mx-2 md:mx-12">
    <h2 class="uppercase tracking-wide text-lg font-semibold text-gray-700 my-2">
		{$t("checkout.shipping-methods.title")}
	</h2>
    <section class="bg-white shadow-md rounded text-neutral-dark md:text-lg grid grid-cols-2 gap-4">
        {#each $checkout.shipping_methods as method}
            <Radio
                label={`${method.description} - ${method.price.formatted_with_symbol}`}
                name="shippingMethod"
                value={method}
                on:change={() => selectShippingMethod(method.id)}
                className="flex-center-middle py-3"
            />
        {/each}
    </section>
</div>