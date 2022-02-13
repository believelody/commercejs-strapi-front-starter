<script>
    import { getContext } from 'svelte';
    import { getNotificationsContext } from 'svelte-notifications';
    import api from '$lib/api';
    import { t } from '$lib/i18n';
    import { cart, sidebar } from '$lib/stores';
    import CartSidebar from '../sidebars/CartSidebar.svelte';
    import { openLoadingModal } from '../../context/modal';

    export let order;
    let loading = false, error;
    const { open, close } = getContext("simple-modal");
    const { addNotification } = getNotificationsContext();

    async function reOrder() {
        loading = true;
        if (!$cart) {
            await api.cart.createCart();
        }
        const res = await api.cart.addItems($cart.id, order.line_items.map(item => {
            let options = {};
            if (item.variants.length) {
                item.variants.forEach(variant => {
                    options[variant.variant_id] = variant.option_id;
                });
            }
            return { id: item.product_id, quantity: item.quantity, options };
        }));
        if (res.success) {
            addNotification({
                position: 'bottom-left',
                heading: $t(`notifications.cart.heading`),
                text: $t(`notifications.cart.description.add.${order.line_items.length > 1 ? "many" : "one"}`),
                description: $t(`notifications.cart.description.add.${order.line_items.length > 1 ? "many" : "one"}`),
                type: 'success',
                removeAfter: 5000
            });
            $sidebar = CartSidebar;
            loading = false;
        } else {
            error = res.error;
        }
    };

    $: loading ?
        openLoadingModal(open, {
            topText: $t("notifications.cart.loading.top"),
            bottomText: $t("notifications.cart.loading.bottom")
        }) :
        close();
</script>

<style>
    /* your styles go here */
</style>

<button on:click={reOrder} class="bg-green-500 hover:bg-green-600 rounded py-1 px-3">
    {$t("order.account.table.body.button.re-order")}
</button>