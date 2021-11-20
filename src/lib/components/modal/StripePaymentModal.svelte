<script>
    import { onMount } from "svelte";
    import { Jumper } from "svelte-loading-spinners";
    import { goto } from '$app/navigation';
    import { t } from '$lib/i18n';
    import { 
        stripe,
        user,
        checkout,
        shipping,
        billing,
        isBillingSameAsShipping
    } from '$lib/stores';
    import { onCaptureOrder } from '$lib/actions/checkout';
    import DisplaySuccessPayment from "../display/DisplaySuccessPayment.svelte";
    import DisplayFailedPayment from "../display/DisplayFailedPayment.svelte";

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
        await pay();
        paymentProcessing = false;
        // const timeout = setTimeout(() => {
        //     paymentProcessing = false;
            // paymentSuccess = false;
        //     paymentError = true;
        // }, 3000);
    });

    async function pay() {
        paymentError = false;
        if ($stripe && cardElement) {
            const { error, paymentMethod } = await $stripe.createPaymentMethod({ type: "card", card: cardElement });
            if (error) {
                paymentError = error;
                paymentProcessing = false;
            }else {
                const shippingObj = {
                    name: shippingValue.title ?? $t("checkout.address.shipping-title"),
                    street: shippingValue.address1 + " " + shippingValue.address2,
                    town_city: shippingValue.city,
                    county_state: shippingValue.subdivision,
                    postal_zip_code: shippingValue.zip,
                    country: shippingValue.country,
                };
                const billingObj = isBillingSameAsShippingValue ? {
                    name: shippingValue.title ?? $t("checkout.address.billing-title"),
                    ...shippingObj
                } : {
                    name: billingValue.title ?? $t("checkout.address.billing-title"),
                    street: billingValue.address1 + " " + billingValue.address2,
                    town_city: billingValue.city,
                    county_state: billingValue.subdivision,
                    postal_zip_code: billingValue.zip,
                    country: billingValue.country,
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

<div class="bg-white flex items-center justify-center px-4 pt-5 pb-4 sm:p-6 sm:pb-4">
    {#if paymentProcessing}
        <section class="h-4/5 flex flex-col justify-center items-center h-auto">
            <span class="mb-4 font-medium text-lg">{$t("checkout.payment.processing1")},</span>
            <Jumper size="260" color="#FF3E00" unit="px" />
            <span class="mt-4 font-medium text-lg">{$t("checkout.payment.processing2")}.</span>
        </section>
    {:else if paymentSuccess}
        <DisplaySuccessPayment
            user={$user}
            shipping={shippingValue}
            billing={billingValue}
            isBillingSameAsShipping={isBillingSameAsShippingValue}
            {live}
            reference={paymentResult.customer_reference}
        />
    {:else if paymentError}
        <DisplayFailedPayment />
    {/if}
</div>