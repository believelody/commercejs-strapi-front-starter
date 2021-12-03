<script>
    import {getContext} from "svelte";
    import { t } from '$lib/i18n';
    import api from "$lib/api";
    import { sidebar } from "$lib/stores";
    import AddressModal from "../../components/modal/AddressModal.svelte";

    export let information, type;
    const { open, close } = getContext("simple-modal");

    function createAddress() {
        open(AddressModal, { title: $t(`account.addresses.${type}.label`), close, type, submit: api.address.create, withoutShadow: true });
    }

    function updateAddress() {
        open(AddressModal, { title: $t(`account.addresses.${type}.label`), close, information, submit: api.address.update, withoutShadow: true });
    }

    function selectAddress() {
        open(AddressModal, { title: $t(`account.addresses.${type}.label`), type, withoutShadow: true });
    }
</script>

<section class="relative flex flex-col rounded my-4 justify-center border shadow-md w-full xl:w-3/5 items-center">
    <h3 class="border-b w-full py-2 text-center text-lg font-medium">{$t(`account.addresses.${type}.label`)}</h3>
    <div class="py-{information ? 4 : 12} flex flex-col justify-center items-center">
        {#if information}
            <span>{information.title}</span>
            <span>{information.address1}</span>
            {#if information.address2}
                <span>{information.address2}</span>
            {/if}
            <span>{information.zip} {information.city}</span>
            <span>{$t(`country.${information.country.key.toLowerCase()}`)}</span>
            <div class="pt-3 flex flex-col lg:flex-row items-center justify-center">
                <button on:click={updateAddress} class="bg-indigo-300 py-1 px-3 mr-0 lg:mr-6 mb-4 lg:mb-0 rounded">
                    {$t("account.addresses.update")}
                </button>
                <button on:click={selectAddress} class="bg-indigo-400 py-1 px-3 ml-0 lg:ml-6 rounded">
                    {$t("account.addresses.select")}
                </button>
            </div>
        {:else}
            <span>{$t("account.addresses.no-address")}</span>
            <button on:click={createAddress} class="bg-indigo-300 py-1 px-2 rounded mt-2">
                + {$t("account.addresses.add")}
            </button>
        {/if}
    </div>
</section>