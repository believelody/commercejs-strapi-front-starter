<script>
    import {getContext} from "svelte";
    import { t } from '$lib/i18n';
    import { sidebar } from "$lib/stores";
    import AddressModal from "../../components/modal/AddressModal.svelte";

    export let information, type, noAddresses;
    const { open } = getContext("simple-modal");

    function selectAddress() {
        if (noAddresses) {
            open(AddressModal, { title: $t(`account.addresses.${type}.label`), withoutShadow: true });
        } else {

        }
    }
</script>

<section class="relative flex flex-col rounded m-4 justify-center flex-grow border-2">
    <h3 class="border-b w-full py-2 text-center text-lg font-medium">{$t(`account.addresses.${type}.label`)}</h3>
    <div class="p-{information ? 4 : 12} flex flex-col justify-center items-center">
        {#if information}
            <span>{information.title}</span>
            <span>{information.address1}</span>
            <span>{information.address2}</span>
            <span>{information.zip} {information.city}</span>
            <span>{$t(`country.${information.country}`)}</span>
        {:else}
            <span>{$t("account.addresses.no-address")}</span>
            <button on:click={selectAddress} class="{noAddresses ? "" : "absolute bottom-0 right-0"} bg-gray-200 py-1 px-2 rounded underline mt-2">
                + {$t(`account.addresses.${noAddresses ? "add" : "select"}`)}
            </button>
        {/if}
    </div>
</section>