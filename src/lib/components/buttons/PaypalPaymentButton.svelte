<script>
    import { onMount } from 'svelte';
	import { loadScript } from '@paypal/paypal-js';
    import { paypal } from '$lib/stores';

    onMount(async () => {
        $paypal = await loadScript({
            "client-id": import.meta.env.VITE_PAYPAL_CLIENT_ID,
        });
        $paypal.Buttons({
            style: {
                shape: 'rect',
                layout: 'horizontal',
                label: 'paypal',
                tagline: false,
            },
            createOrder: function (data, actions) {
                // Set up the transaction
                return actions.order.create({
                    purchase_units: [
                        {
                            amount: {
                                value: 1,
                            },
                        },
                    ],
                });
            },
            onApprove: function (data, actions) {
                // Capture order after payment approved
                return actions.order.capture().then(function () {
                    alert("Payment successful!");
                });
            },
            onError: function (err) {
                // Log error if something goes wrong during approval
                alert("Something went wrong");
                console.log("Something went wrong", err);
            },
        }).render('#paypal-button-container');

        return () => {
            $paypal = null;
        }
    });
</script>

<div id="paypal-button-container" />