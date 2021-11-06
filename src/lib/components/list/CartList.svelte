<script>
    import { createEventDispatcher } from 'svelte';
    import { bind } from 'svelte-simple-modal';
    import { t } from '$lib/i18n';
    import { cart, modal } from '$lib/stores';
    import { updateItemQuantity, deleteItem } from '$lib/actions/cart'
import TrashIcon from '../svg/TrashIcon.svelte';
import DangerModal from '../modal/DangerModal.svelte';

    export let items, loading;

    const dispatch = createEventDispatcher();

	async function updateQuantity(itemId, quantity) {
		try {
			dispatch("is-loading", true);
			await updateItemQuantity($cart.id, itemId, quantity);
		} catch (error) {
			console.log(error);
		} finally {
			dispatch("is-loading", false);
		}
	}

	function showRemoveItemModal(item) {
		modal.set(
			bind(DangerModal, {
				title: $t("cart.modal.delete-item.title", { name: item.name }),
				description: $t('cart.modal.delete-item.description'),
				actionCallback: async () => {
					await deleteItem($cart.id, item.id);
				}
			})
		);
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
                                <div class="flex justify-between text-base font-medium text-gray-900">
                                    <h3>
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
                                        on:click={() => updateQuantity(item.id, item.quantity - 1)}
                                        class="text-lg py-1 px-4 text-white rounded bg-gray-600 disabled:opacity-75 disabled:cursor-{loading ? "wait" : "not-allowed"}"
                                        >-</button
                                    >
                                    <span class="mx-4 text-lg">{item.quantity} x {item.price.formatted_with_symbol}</span>
                                    <button
                                        disabled={item.quantity >= 5 || loading}
                                        on:click={() => updateQuantity(item.id, item.quantity + 1)}
                                        class="text-lg py-1 px-4 text-white rounded bg-gray-600 disabled:opacity-75 disabled:cursor-{loading ? "wait" : "not-allowed"}"
                                        >+</button
                                    >
                                </p>
                                <div>
                                    <button
                                        on:click={() => showRemoveItemModal(item)}
                                        type="button"
                                        class="font-medium text-indigo-600 hover:text-indigo-500 hover:bg-red-200 p-2 rounded"
                                    >
                                        <span class="sr-only">{$t("cart.cta.remove-item")}</span>
                                        <TrashIcon size={6} color="red-400" />
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