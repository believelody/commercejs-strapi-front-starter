<script>
    import { t } from "$lib/i18n";
    import CarrierIcon from "$elements/icon/CarrierIcon.svelte";
    import TrustBadge from "$elements/badge/TrustBadge.svelte";
</script>

<style>
    /* your styles go here */
</style>

<TrustBadge>
    <CarrierIcon slot="icon" size={24} />
    <svelte:fragment slot="text">{$t("product.trust.shipping")}</svelte:fragment>
</TrustBadge>