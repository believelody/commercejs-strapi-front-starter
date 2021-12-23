<script>
    import { getContext } from "svelte";
    import api from '$lib/api';
    import { t } from '$lib/i18n';
    import AddressModal from "../modal/AddressModal.svelte";

    export let type, withoutShadow = false;
    const { open } = getContext("simple-modal");

    function openAddressModal() {
        open(AddressModal, { title: $t(`account.addresses.${type}.label`), type, withoutShadow, action: "create" });
    }
</script>

<style>
    /* your styles go here */
</style>

<button on:click={openAddressModal} class="bg-indigo-300 py-1 px-3 rounded disabled:opacity-75 disabled:bg-gray-500 disabled:cursor-not-allowed" {...$$restProps}>
    + {$t(`account.addresses.${type}.label`)}
</button>