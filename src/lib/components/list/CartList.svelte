<script>
    import {createEventDispatcher, getContext} from 'svelte';
    import {getNotificationsContext} from "svelte-notifications";
    import {t} from '$lib/i18n';
    import {cart, checkout} from '$lib/stores';
    import api from '$lib/api';
    import TrashIcon from '../svg/TrashIcon.svelte';
    import DangerModal from '../modal/DangerModal.svelte';

    export let items, loading;
    const dispatch = createEventDispatcher();
    const {open} = getContext("simple-modal");
    const { addNotification } = getNotificationsContext();

    async function updateQuantity(item, quantity) {
        try {
            dispatch("loading", true);
            if ($checkout) {
                await api.checkout.checkQuantity($checkout.id, item.id, quantity, item.variant.id)
            }
            const resUpdateQuantity = await api.cart.updateItemQuantity($cart.id, item.id, quantity);
            if (resUpdateQuantity.success) {
                addNotification({
                    position: 'bottom-left',
                    heading: $t('cart.notifications.heading'),
                    text: $t('cart.notifications.description.update', { name: item.name }),
                    description: $t('cart.notifications.description.update', { name: item.name }),
                    type: 'success',
                    removeAfter: 5000
                });
            }
        } catch (error) {
            console.log(error);
        } finally {
            dispatch("loading", false);
        }
    }

    function showRemoveItemModal(item) {
        open(DangerModal, {
            title: $t("cart.modal.delete-item.title", {name: item.name}),
            description: $t('cart.modal.delete-item.description'),
            actionCallback: async () => {
                await api.cart.deleteItem($cart.id, item.id);
            }
        });
    }
</script>

<style>
    /* your styles go here */
</style>

<div class="border-b border-gray-200 flex-grow mt-1 overflow-y-hidden">
    <div class="h-full px-2 overflow-y-auto">
        <div class="h-full flow-root">
            <ul role="list" class="h-full divide-y divide-gray-200">
                {#each items as item}
                    <li class="py-6 flex">
                        <a
                            href="/products/{item.permalink}"
                            class="flex-shrink-0 w-24 h-24 border border-gray-200 rounded-md overflow-hidden"
                        >
                            <img
                                    src={item.image.url}
                                    alt={item.product_name}
                                    class="w-full h-full object-center object-cover"
                            />
                        </a>

                        <div class="ml-4 flex-1 flex flex-col">
                            <div>
                                <div class="flex justify-between">
                                    <h3 class="text-base font-medium text-gray-900">
                                        <a href="/products/{item.permalink}">{item.name}</a>
                                    </h3>
                                    <p class="ml-4 text-indigo-500">{item.line_total.formatted_with_symbol}</p>
                                </div>
                                {#each item.variants as variant}
                                    <p class="mt-1 text-sm text-gray-500">
                                        {variant.variant_name} : {variant.option_name}
                                    </p>
                                {/each}
                            </div>
                            <div class="flex items-center justify-between text-sm">
                                <p class="text-gray-500">
                                    <button
                                            disabled={item.quantity <= 1 || loading}
                                            on:click={() => updateQuantity(item, item.quantity - 1)}
                                            class="text-lg py-1 px-4 text-white rounded bg-gray-600 disabled:opacity-75 disabled:cursor-{loading ? "wait" : "not-allowed"}"
                                        >-
                                    </button>
                                    <span class="mx-4 text-lg">{item.quantity}
                                        x {item.price.formatted_with_symbol}</span>
                                    <button
                                            disabled={item.quantity >= 5 || loading}
                                            on:click={() => updateQuantity(item, item.quantity + 1)}
                                            class="text-lg py-1 px-4 text-white rounded bg-gray-600 disabled:opacity-75 disabled:cursor-{loading ? "wait" : "not-allowed"}"
                                        >+
                                    </button>
                                </p>
                                <div>
                                    <button on:click={() => showRemoveItemModal(item)}>
                                        <span class="sr-only font-medium text-red-600 hover:text-indigo-500 hover:bg-red-200 p-2 rounded">{$t("cart.cta.remove-item")}</span>
                                        <TrashIcon size={6} color="red-500"/>
                                    </button>
                                </div>
                            </div>
                        </div>
                    </li>
                {/each}
            </ul>
        </div>
    </div>
</div>