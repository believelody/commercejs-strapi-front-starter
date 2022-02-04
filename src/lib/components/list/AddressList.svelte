<script>
    import { createEventDispatcher } from 'svelte';
    import { t } from '$lib/i18n';
    import { profile, sidebar } from '$lib/stores';
    import CenterSection from '../center-section/CenterSection.svelte';
    import AddressItem from '../addresses/AddressItem.svelte';

    export let items, type;
    let loading = false;
    const dispatch = createEventDispatcher();

    function dispatchLoading({ detail }) {
        dispatch("loading", {loading: detail.loading});
        loading = detail.loading;
    }

    $:  {
        if (items.length === 0) {
            $sidebar = null;
        }
    };
</script>

<style>
    /* your styles go here */
</style>

<div class="grow mt-1 overflow-y-hidden">
    <div class="h-full px-2 overflow-y-auto">
        <div class="flow-root">
            <ul role="list" class="h-full divide-y divide-gray-200">
                {#each items as item}
                    <li class="{item.id === $profile?.customer.meta[type]?.id ? "bg-blue-100 relative" : ""} shadow-md p-2 my-2 border border-gray-300 rounded flex flex-col justify-center items-center">
                        <AddressItem
                            information={item}
                            on:loading={dispatchLoading}
                            isSelected={item.id === $profile?.customer.meta[type]?.id}
                            primary={item.id === $profile?.customer.meta[type]?.id ? "update" : "remove"}
                            secondary="choose"
                            {loading}
                        />
                    </li>
                {:else}
                    <CenterSection>
                        {$t("account.addresses.empty-list")}
                    </CenterSection>
                {/each}
            </ul>
        </div>
    </div>
</div>