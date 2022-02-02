<script>
    import { t } from "$lib/i18n";
    import Accordion from "./Accordion.svelte";
    import ReviewFilterButtonCheckbox from "../reviews/ReviewFilterButtonCheckbox.svelte";

    export let reviews;
</script>

<style>
    /* your styles go here */
</style>

<Accordion>
    <h3 slot="header" class="py-2 text-lg font:semibold text-center">{$t("review.product.filter.header")}</h3>
    <div slot="content" class="w-full m-1 border flex flex-col lg:flex-col rounded shadow-md divide-y lg:divide-x-0 lg:divide-x">
        <ReviewFilterButtonCheckbox {reviews} on:filter />
    </div>
</Accordion>