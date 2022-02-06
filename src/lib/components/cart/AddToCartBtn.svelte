<script>
    import { cart } from "$lib/stores";
    import api from "$lib/api";
    import { t } from '$lib/i18n'
    import ItemToCartSuccessModal from "../modal/ItemToCartSuccessModal.svelte";
    import {getContext} from "svelte";

    export let product, quantity, selectedColor, selectedSize;
    let loading = false;
    const { open } = getContext("simple-modal");

	async function addItem() {
        let options = {};
        loading = true;
        if (product.variants) {
            const sizeGroup = product.variants.find(group => group.name.toLowerCase() === "taille");
            const colorGroup = product.variants.find(group => group.name.toLowerCase() === "couleur");
            if (sizeGroup) {
                options[sizeGroup.id] = selectedSize.id;
            }
            if (colorGroup) {
                options[colorGroup.id] = selectedColor.id;
            }
        }
        if (!$cart) {
            await api.cart.createCart();
        }
        await api.cart.addToCart($cart.id, product.id, quantity, options);
        loading = false;
        open(ItemToCartSuccessModal, { product, selectedColor, selectedSize, quantity });
    }
</script>

<button
	class="flex text-white text-lg bg-indigo-500 py-4 px-6 focus:outline-none hover:bg-indigo-600 rounded disabled:opacity-75 disabled:cursor-not-allowed"
    on:click={addItem}
    disabled={loading}
>
	{#if loading}
        {$t("product.cart.adding")}
    {:else}
        {$t("product.cart.add")}
    {/if}
</button>
