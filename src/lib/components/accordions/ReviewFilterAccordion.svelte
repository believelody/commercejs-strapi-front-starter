<script>
    import {t} from "$lib/i18n";
    import Accordion from "$elements/accordion/Accordion.svelte";
    import ReviewFilterButtonCheckbox from "../reviews/ReviewFilterButtonCheckbox.svelte";

    export let reviews;
</script>

<style>
    /* your styles go here */
</style>

<Accordion class="bg-gray-100 border shadow-md rounded">
    <h3 slot="header" class="py-2 text-lg font:semibold text-center">{$t("review.product.filter.header")}</h3>
    <div slot="content" class="w-full border rounded divide-y">
        <ReviewFilterButtonCheckbox {reviews} on:filter />
    </div>
</Accordion>