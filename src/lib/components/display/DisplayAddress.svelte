<script>
    import {getContext} from "svelte";
    import { t } from '$lib/i18n';
    import api from "$lib/api";
    import { sidebar } from "$lib/stores";
    import AddressModal from "../modal/AddressModal.svelte";
    import AddressSidebar from "../sidebar/AddressSidebar.svelte";
    import FullAddress from "./FullAddress.svelte";

    export let information, type, items;
    const { open, close } = getContext("simple-modal");

    function createAddress() {
        open(AddressModal, { title: $t(`account.addresses.${type}.label`), close, type, submit: api.address.create, withoutShadow: true });
    }

    function updateAddress() {
        open(AddressModal, { title: $t(`account.addresses.${type}.label`), close, information, submit: api.address.update, withoutShadow: true });
    }

    function showAddressSidebar() {
        sidebar.set({
            component: AddressSidebar,
            props: {
                type,
                items,
                addAddress: createAddress
            }
        });
    }

    $: console.log(items);
</script>

<section class="flex flex-col bg-white rounded my-4 justify-center border shadow-md w-full xl:w-3/5 items-center">
    <h3 class="border-b w-full py-2 text-center text-lg font-medium">{$t(`account.addresses.${type}.label`)}</h3>
    <div class="py-{information ? 4 : 12} flex flex-col justify-center items-center">
        {#if information}
            <FullAddress
                {information}
                {items}
                callback1={updateAddress}
                callback2={showAddressSidebar}
                callback1Text={$t("account.addresses.update")}
                callback2Text={$t("account.addresses.select")}
            />
        {:else}
            <span>{$t("account.addresses.no-address")}</span>
            <button on:click={createAddress} class="bg-indigo-300 py-1 px-2 rounded mt-2">
                + {$t("account.addresses.add")}
            </button>
            {#if items.length}
                <button on:click={showAddressSidebar} class="bg-indigo-300 py-1 px-2 rounded mt-2">
                    {$t("account.addresses.select")}
                </button>
            {/if}
        {/if}
    </div>
</section>