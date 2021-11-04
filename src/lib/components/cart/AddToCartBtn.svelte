<script>
    import { bind } from 'svelte-simple-modal';
    import { cart, modal } from "../../stores";
    import { addToCart, createCart } from "../../actions/cart";
    import ItemToCartSuccessModal from "../modal/ItemToCartSuccessModal.svelte";

    export let product, quantity, selectedColor = null, selectedSize = null;
    let loading = false;

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
            console.log("no cart")
            await createCart();
        }
        await addToCart($cart.id, product.id, quantity, options);
        loading = false;
        modal.set(bind(ItemToCartSuccessModal, { product, selectedColor, selectedSize, quantity }));
    }
</script>

<button
	class="flex ml-auto text-white bg-indigo-500 border-0 py-2 px-6 focus:outline-none hover:bg-indigo-600 rounded disabled:opacity-75"
    on:click={addItem}
    disabled={loading}
>
	{#if loading}
        Ajout en cours ...
    {:else}
        Ajouter au panier
    {/if}
</button>
