<script>
    import {t} from '$lib/i18n';
    import Accordion from '../../elements/accordion/Accordion.svelte';
    import ShippingInfo from '../checkout/ShippingInfo.svelte';
    import TotalCheckout from '../checkout/TotalCheckout.svelte';
    import CartList from '../list/CartList.svelte';

    export let cart;
</script>

<style>
</style>

<div class="xl:hidden mx-2 md:mx-12 rounded-md">
    <div class="mb-3 bg-white shadow-lg rounded text-neutral-dark">
        <Accordion>
            <h1 slot="header" class="flex-grow py-2 text-xl text-center text-neutral-dark px-8">{$t("checkout.summary")}</h1>
            <section slot="content" class="overflow-y-auto">
                <CartList items={$cart.line_items} />
                <div class="px-8 border-b">
                    <div class="flex justify-between py-4 text-neutral-dark">
                        <span>{$t("common.subtotal")}</span>
                        <span class="font-semibold text-indigo-500">€846.98</span>
                    </div>
                    <ShippingInfo />
                </div>
                <TotalCheckout />
            <section>
        </Accordion>

    </div>
</div>