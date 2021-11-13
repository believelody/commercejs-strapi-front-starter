<script>
    import { t } from '$lib/i18n';
    import { stripe,
        checkout,
        user,
        shipping,
        billing,
        isBillingSameAsShipping,
        checkoutLoading
    } from '$lib/stores';
    import { onCaptureOrder } from '$lib/actions/checkout';

    export let cardElement, isValid;
    let paymentError, orderData, paymentResult, paymentProcessing = false;
    
    async function pay() {
        paymentError = null;
        if ($stripe && cardElement) {
            const { error, paymentMethod } = await $stripe.createPaymentMethod({ type: "card", card: cardElement });
            if (error) {
                paymentError = error;
            }else {
                const shippingObj = {
                    name: $shipping.title ?? $t("checkout.address.shipping-title"),
                    street: $shipping.address1 + " " + $shipping.address2,
                    town_city: $shipping.city,
                    county_state: $shipping.subdivision,
                    postal_zip_code: $shipping.zip,
                    country: $shipping.country,
                };
                const billingObj = $isBillingSameAsShipping ? {
                    name: $shipping.title ?? $t("checkout.address.billing-title"),
                    ...shippingObj
                } : {
                    name: $billing.title ?? $t("checkout.address.billing-title"),
                    street: $billing.address1 + " " + $billing.address2,
                    town_city: $billing.city,
                    county_state: $billing.subdivision,
                    postal_zip_code: $billing.zip,
                    country: $billing.country,
                };

                orderData = {
                    line_items: $checkout
                                    .live.
                                    line_items
                                    .map(item => ({
                                        [item.id] : {
                                            variant_id: item.variant.id,
                                            quantity: item.quantity 
                                        }
                                    })),
                    customer: {
                        firstname: $user.firstname,
                        lastname: $user.lastname,
                        email: $user.email,
                    },
                    shipping: shippingObj,
                    billing: billingObj,
                    fulfillment: {
                        shipping_method: $checkout.live.shipping.id
                    },
                    payment: {
                        gateway: "stripe",
                        stripe: {
                            payment_method_id: paymentMethod.id,
                        }
                    }
                }

                paymentResult = await onCaptureOrder($checkout.id, orderData);
                console.log(res);
                if (paymentResult.payment_status == "paid") {

                }
            }
        }
    }
</script>

<style>
    /* your styles go here */
</style>

{#if paymentError}
    <section class="mx-2 md:mx-12 py-2">
        <span class="text-sm text-red-400">{$t(`checkout.payment.${paymentError.code}`)}</span>
    </section>
{/if}
<button on:click={pay} disabled={!isValid} class="px-4 py-4 bg-indigo-600 text-white focus:ring focus:outline-none w-full text-xl font-semibold transition-colors disabled:opacity-75 disabled:cursor-not-allowed">
    {#if $checkoutLoading}
        {$t("common.update")}
    {:else}
        {$t("checkout.submit-stripe", { amount: $checkout.live.total.formatted_with_symbol })}
    {/if}
</button>