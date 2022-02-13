<script>
    import { onMount } from 'svelte';
    import { t } from '$lib/i18n';
    import api from '$lib/api';
    import VariantListDisplay from '../displays/VariantsListDisplay.svelte';

    export let item;
    let product, error;

    async function getProduct() {
        const res = await api.product.getById(item.product_id);
        if (res.success) {
            product = res.product;
        } else {
            error = res.error;
        }
    }

    onMount(async () => {
        if (!product) {
            await getProduct();
        }
    })
</script>

<style>
    /* your styles go here */
</style>

<a href={`/products/${product?.permalink}`} class="underline font-medium text-lg hover:text-blue-600">{item.name}</a>
<div>{item.quantity} x {item.price.formatted_with_symbol}</div>
<VariantListDisplay variants={item.variants} style="disc" />
<div>{$t("common.subtotal")} : {item.line_total.formatted_with_symbol}</div>