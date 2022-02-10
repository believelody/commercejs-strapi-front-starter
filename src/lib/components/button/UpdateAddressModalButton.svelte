<script>
    import { getContext } from "svelte";
    import { t } from '$lib/i18n';
    import { openAddressModal } from "../../context/modal";

    export let information;
    const { open } = getContext("simple-modal");
</script>

<style>
    /* your styles go here */
</style>

<button on:click={() => openAddressModal(open, { title: $t(`account.addresses.${information.type}.label`), type: information.type, information, action: "update" })} class="bg-indigo-300 py-1 px-3 rounded disabled:opacity-75 disabled:bg-gray-500 disabled:cursor-not-allowed" {...$$restProps}>
    {$t("account.addresses.update")}
</button>