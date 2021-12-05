<script>
    import { onMount } from "svelte";
    import { goto } from '$app/navigation';
    import { t } from '$lib/i18n';
    import { 
        stripe,
        user,
        profile,
        checkout,
        shipping,
        billing,
        isBillingSameAsShipping
    } from '$lib/stores';
    import api from '$lib/api';
    import DisplaySuccessPayment from "../display/DisplaySuccessPayment.svelte";
    import DisplayFailedPayment from "../display/DisplayFailedPayment.svelte";
    import StripePaymentLoading from "../loading/StripePaymentLoading.svelte";

    export let cardElement;
    let paymentError,
        orderData,
        paymentResult,
        paymentProcessing = false,
        paymentSuccess = false,
        live = $checkout.live,
        shippingValue = $shipping,
        billingValue = $billing,
        isBillingSameAsShippingValue = $isBillingSameAsShipping;

    onMount(async () => {
        paymentProcessing = true;
        await pay($profile.customer ?? $user);
        paymentProcessing = false;
    });

    async function pay(customer) {
        paymentError = false;
        if ($stripe && cardElement) {
            const { error, paymentMethod } = await $stripe.createPaymentMethod({ type: "card", card: cardElement });
            if (error) {
                paymentError = error;
                paymentProcessing = false;
            }else {
                const shippingObj = {
                    name: shippingValue.title ?? $t("checkout.address.shipping-title"),
                    street: `${shippingValue.address1} ${shippingValue.address2 || ""}`,
                    town_city: shippingValue.city,
                    postal_zip_code: shippingValue.zip,
                    country: shippingValue.country.key,
                };
                if (shippingValue.subdivision) {
                    shippingObj.county_state = shippingValue.subdivision.key;
                }
                const billingObj = isBillingSameAsShippingValue ? {
                    name: shippingValue.title ?? $t("checkout.address.billing-title"),
                    ...shippingObj
                } : {
                    name: billingValue.title ?? $t("checkout.address.billing-title"),
                    street: `${billingValue.address1} ${billingValue.address2 || ""}`,
                    town_city: billingValue.city,
                    postal_zip_code: billingValue.zip,
                    country: billingValue.country.key,
                };
                if (billingValue.subdivision) {
                    billingObj.county_state = shippingValue.subdivision.key;
                }
                if (customer.hasOwnProperty("phone") && !customer.phone) {
                    delete customer.phone;
                }
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
                        ...customer,
                        meta: {
                            shipping: shippingValue,
                            billing: billingValue,
                            isGuest: customer.meta?.isGuest
                        }
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

                paymentResult = await api.checkout.onCaptureOrder($checkout.id, orderData);
                if (paymentResult.status_payment === "paid") {
                    goto("/");
                    paymentSuccess = true;
                    paymentError = false;
                    orderData = null;
                } else if (paymentResult.error) {
                    paymentSuccess = false;
                    paymentError = true;
                }
            }
        }
    }
</script>

<div class="relative bg-white flex items-center justify-center px-4 pt-5 pb-4 sm:p-6 sm:pb-4">
    {#if paymentProcessing}
        <StripePaymentLoading />
    {:else if paymentSuccess}
        <DisplaySuccessPayment
            user={$profile.customer ?? $user}
            shipping={shippingValue}
            billing={billingValue}
            isBillingSameAsShipping={isBillingSameAsShippingValue}
            {live}
            reference={paymentResult.customer_reference}
        />
    {:else if paymentError}
        <DisplayFailedPayment error={paymentResult.error} />
    {/if}
</div>