<script>
    import { t } from "$lib/i18n";
    import TrustBadge from "../../elements/badge/TrustBadge.svelte";
    import PlusIcon from "../../elements/icon/PlusIcon.svelte";
    import BankCardIcon from "../../elements/icon/BankCardIcon.svelte";
    import PaypalIcon from "../../elements/icon/PaypalIcon.svelte";
</script>

<style>
    /* your styles go here */
</style>

<TrustBadge>
    <span slot="icon" class="flex items-center">
        <BankCardIcon size={24} />
        <PlusIcon strokeWidth={2} />
        <PaypalIcon size={24} />
    </span>
    <svelte:fragment slot="text">{$t("product.trust.payment")}</svelte:fragment>
</TrustBadge>