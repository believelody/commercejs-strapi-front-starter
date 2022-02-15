<script>
    import { getContext } from "svelte";
    import { t } from '$lib/i18n';
    import PrimaryButton from "$lib/elements/button/PrimaryButton.svelte";
    import { openAddressModal } from "../../context/modal";

    export let information;
    const { open } = getContext("simple-modal");
</script>

<style>
    /* your styles go here */
</style>

<PrimaryButton outlined on:click={() => openAddressModal(open, { title: $t(`account.addresses.${information.type}.label`), type: information.type, information, action: "update" })} {...$$restProps}>
    {$t("account.addresses.update")}
</PrimaryButton>