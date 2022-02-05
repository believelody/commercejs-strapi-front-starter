<script>
    import { t } from "$lib/i18n";
    import Card from "../card/Card.svelte";
    import CarrierIcon from "../svg/CarrierIcon.svelte";
</script>

<style>
    /* your styles go here */
</style>

<Card class="w-full h-full border-2 border-gray-500" shadow="none">
    <div slot="content">
        <p class="flex justify-center"><slot name="icon" /></p>
        <p class="text-lg font-semibold mx-2 text-center"><slot name="text" /></p>
    </div>
</Card>