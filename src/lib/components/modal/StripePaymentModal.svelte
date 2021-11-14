<script>
    import { onMount } from "svelte";
    import Moon from "svelte-loading-spinners/dist/ts/Moon.svelte";
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

    export let cardElement;
    let paymentError, orderData, paymentResult, paymentProcessing = false, paymentSuccess = false;

    onMount(async () => {
        // pay();
        paymentProcessing = true;
        const timeout = setTimeout(() => {
            paymentProcessing = false;
            paymentSuccess = true;
        }, 3000);
    });

    async function pay() {
        paymentProcessing = true;
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
                    paymentSuccess = true;
                    paymentProcessing = false;
                }
            }
        }
    }
    $: console.log(paymentProcessing);
</script>

<div class="bg-white h-full flex items-center justify-center px-4 pt-5 pb-4 sm:p-6 sm:pb-4">
    {#if paymentProcessing}
        <section class="h-4/5 flex flex-col justify-center items-center h-auto">
            <span class="mb-4 font-medium text-lg">{$t("checkout.payment.processing1")},</span>
            <Moon size="260" color="#FF3E00" unit="px" />
            <span class="mt-4 font-medium text-lg">{$t("checkout.payment.processing2")}.</span>
        </section>
    {:else if paymentSuccess}
        <DisplaySuccessPayment
            user={$user}
            shipping={$shipping}
            items={$checkout.live.line_items}
            shippingMethod={$checkout.live.shipping.description}
        />
    {:else}
        Payment Processing finished
    {/if}
</div>