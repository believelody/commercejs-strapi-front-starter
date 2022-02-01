<script>
    import {goto} from "$app/navigation";
    import { t } from "$lib/i18n";
    import HeaderTitle from "../header/HeaderTitle.svelte";
    import Thumbnail from "../thumbnail/Thumbnail.svelte";

    export let items;

    function goToRelatedProduct(index) {
        goto(`/products/${items[index].permalink}`);
    }
</script>

<div class="w-full h-auto">
    <HeaderTitle textSize="2xl" title={$t("product.detail.related")} />
    <Thumbnail
            thumbnails={items.map(item => item.image)}
            productData={items.map(item => ({
                name: item.name,
                permalink: item.permalink,
            }))}
            height={250}
            noSelectedItemBorder
            infinite
            particlesToShow={3}
            on:showPage={ ({detail}) => goToRelatedProduct(detail) }
    />
</div>