<script>
    import {getContext} from "svelte";
    import { cart } from "$lib/stores";
    import api from "$lib/api";
    import { t } from '$lib/i18n'
    import { openItemToCartSuccessModal } from "../../context/modal";
    import PrimaryButton from "../../elements/button/PrimaryButton.svelte";

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
        openItemToCartSuccessModal(open, { product, selectedColor, selectedSize, quantity });
    }
</script>

<PrimaryButton
    on:click={addItem}
    disabled={loading}
    big
>
	{#if loading}
        {$t("product.cart.adding")}
    {:else}
        {$t("product.cart.add")}
    {/if}
</PrimaryButton>
