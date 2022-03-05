<script>
    import { cart } from "$lib/stores";
    import api from "$lib/api";
    import { t } from '$lib/i18n'
    import PrimaryButton from "../../elements/button/PrimaryButton.svelte";
    import { openModal } from "../../elements/modal/Modal.svelte";
    import ItemToCartSuccessModal from "../modals/ItemToCartSuccessModal.svelte";

    export let product, quantity, selectedVariant;
    let loading = false;

	async function addItem() {
        loading = true;
        if (!$cart) {
            await api.cart.createCart();
        }
        await api.cart.addToCart($cart.id, product.id, quantity, selectedVariant);
        loading = false;
        openModal({
            component: ItemToCartSuccessModal,
            props: { product, selectedVariant, quantity }
        });
    }
</script>

<PrimaryButton
    on:click={addItem}
    disabled={loading || Object.keys(selectedVariant).length < product.variants.length}
    big
>
	{#if loading}
        {$t("product.cart.adding")}
    {:else}
        {$t("product.cart.add")}
    {/if}
</PrimaryButton>
