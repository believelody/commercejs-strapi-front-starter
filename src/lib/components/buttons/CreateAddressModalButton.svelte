<script>
    import { getContext } from "svelte";
    import { t } from '$lib/i18n';
    import { openAddressModal } from "../../context/modal";
    import PrimaryButton from "../../elements/button/PrimaryButton.svelte";

    export let type, withoutShadow = false;
    const { open } = getContext("simple-modal");
</script>

<style>
    /* your styles go here */
</style>

<PrimaryButton
    on:click={() => openAddressModal(open, { title: $t(`account.addresses.${type}.label`), type, withoutShadow, action: "create" })}
    {...$$restProps}
>
    + {$t(`account.addresses.${type}.label`)}
</PrimaryButton>