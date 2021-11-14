<script>
    import { onMount } from "svelte";
    import { Jumper } from "svelte-loading-spinners";
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
    let paymentError, orderData, paymentResult, paymentProcessing = false, paymentSuccess = false;

    onMount(async () => {
        pay();
        // paymentProcessing = true;
        // const timeout = setTimeout(() => {
        //     paymentProcessing = false;
            // paymentSuccess = false;
        //     paymentError = true;
        // }, 3000);
    });

    async function pay() {
        paymentError = false;
        paymentProcessing = true;
        if ($stripe && cardElement) {
            const { error, paymentMethod } = await $stripe.createPaymentMethod({ type: "card", card: cardElement });
            if (error) {
                paymentError = error;
                paymentProcessing = false;
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
                if (paymentResult.status_payment === "paid") {
                    paymentSuccess = true;
                    paymentError = false;
                    orderData = null;
                } else if (paymentResult.error) {
                    paymentSuccess = false;
                    paymentError = true;
                }
                paymentProcessing = false;
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
            shipping={$shipping}
            billing={$billing}
            isBillingSameAsShipping={$isBillingSameAsShipping}
            live={$checkout.live}
            reference={paymentResult.customer_reference}
            orderId={paymentResult.id}
        />
    {:else if paymentError}
        <DisplayFailedPayment error={paymentResult.error} />
    {/if}
</div>