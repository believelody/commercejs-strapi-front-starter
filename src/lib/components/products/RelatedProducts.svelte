<script>
    import {goto} from "$app/navigation";
    import { t } from "$lib/i18n";
    import { media } from "$lib/stores";
    import HeaderTitle from "../header/HeaderTitle.svelte";
    import Thumbnails from "$elements/thumbnail/Thumbnails.svelte";

    export let items;
    let className = "";
    export { className as class };

    function goToRelatedProduct(index) {
        goto(`/products/${items[index].permalink}`);
    }

    function responsiveParticlesToShow() {
        if ($media.desktop) {
            return 3;
        } else if ($media.tablet) {
            return 2;
        } else {
            return 1;
        }
    }
</script>

<div class="w-full h-auto {className}">
    <HeaderTitle textSize="2xl" title={$t("product.detail.related")} />
    <Thumbnails
        let:index
        thumbnails={items.map(item => item.image)}
        height={250}
        noSelectedItemBorder
        infinite
        particlesToShow={responsiveParticlesToShow()}
        on:showPage={ ({detail}) => goToRelatedProduct(detail) }
    >
        <p slot="extra">
            <a href={`/products/${items[index].permalink}`} class="w-full text-center underline">
                {items[index].name}
            </a>
        </p>
    </Thumbnails>
</div>