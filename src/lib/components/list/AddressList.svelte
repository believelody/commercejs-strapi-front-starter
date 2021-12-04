<script>
    import { t } from '$lib/i18n';
    import { getContext } from 'svelte';
    import api from '$lib/api';
    import { profile, sidebar } from '$lib/stores';
    import FullAddress from "../display/FullAddress.svelte";
    import DangerModal from '../modal/DangerModal.svelte';

    export let items, type;
    let loading = false;
    const { open } = getContext("simple-modal");

    async function chooseAddress(item) {
        loading = true;
        const res = await api.address.choose(item);
        if (res.success) {
            $sidebar = null;
        }
        loading = false;
    }

    async function showRemoveModal(item) {
        open(DangerModal, {
            title: $t("account.addresses.modal.delete.title"),
            description: $t("account.addresses.modal.delete.description"),
            actionCallback: async () => {
                await api.address.remove(item.id);
            }
        });
    }

    $:  {
        if (items.length === 0) {
            $sidebar = null;
        }
    };

    $: console.log(items);
</script>

<style>
    /* your styles go here */
</style>

<div class="flex-grow mt-1 overflow-y-hidden">
    <div class="h-full px-2 overflow-y-auto">
        <div class="flow-root">
            <ul role="list" class="h-full divide-y divide-gray-200">
                {#each items as item}
                    <li class="{item.id === $profile?.customer.meta[type]?.id ? "bg-blue-100 relative" : ""} shadow-md p-2 my-2 border border-gray-300 rounded flex flex-col justify-center items-center">
                        <FullAddress
                            information={item}
                            {loading}
                            isSelected={item.id === $profile?.customer.meta[type]?.id}
                            callback1={() => showRemoveModal(item)}
                            callback2={() => chooseAddress(item)}
                            callback1Text={$t("common.delete")}
                            callback2Text={$t("common.select")}
                        />
                    </li> 
                {/each}
            </ul>
        </div>
    </div>
</div>