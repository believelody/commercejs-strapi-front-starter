<script>
    import {goto} from "$app/navigation";
    import { t } from "$lib/i18n";
    import HeaderTitle from "../header/HeaderTitle.svelte";
    import Thumbnails from "../thumbnail/Thumbnails.svelte";

    export let items;

    function goToRelatedProduct(index) {
        goto(`/products/${items[index].permalink}`);
    }
</script>

<div class="w-full h-auto">
    <HeaderTitle textSize="2xl" title={$t("product.detail.related")} />
    <Thumbnails
        let:index
        thumbnails={items.map(item => item.image)}
        height={250}
        noSelectedItemBorder
        infinite
        particlesToShow={3}
        on:showPage={ ({detail}) => goToRelatedProduct(detail) }
    >
        <h4 slot="extra">
            <a href={`/products/${items[index].permalink}`} class="w-full text-center">
                {items[index].name}
            </a>
        </h4>
    </Thumbnails>
</div>