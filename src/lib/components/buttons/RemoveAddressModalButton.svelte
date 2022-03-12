<script>
    import { t } from '$lib/i18n';
    import api from '$api';
    import DangerModalButton from "./DangerModalButton.svelte";

    export let information;
</script>

<style>
    /* your styles go here */
</style>

<DangerModalButton
    title={$t("account.addresses.modal.delete.title")}
    description={$t("account.addresses.modal.delete.description")}
    type={information.type}
    actionCallback={async () => {
        return await api.address.remove(information.id);
    }}
    {...$$restProps}
/>