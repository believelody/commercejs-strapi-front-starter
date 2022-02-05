<script>
    import { t } from "$lib/i18n";
    import ShieldIcon from "../svg/ShieldIcon.svelte";
import TrustBadge from "./TrustBadge.svelte";
</script>

<style>
    /* your styles go here */
</style>

<TrustBadge>
    <ShieldIcon size={24} slot="icon" />
    <svelte:fragment slot="text">{$t("product.trust.security")}</svelte:fragment>
</TrustBadge>