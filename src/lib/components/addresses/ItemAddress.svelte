<script>
    import { createEventDispatcher } from 'svelte';
    import AddressSidebarButton from '../buttons/AddressSidebarButton.svelte';
    import CheckCircleIcon from '$elements/icon/CheckCircleIcon.svelte';
    import ChooseAddressButton from '../buttons/ChooseAddressButton.svelte';
    import UpdateAddressModalButton from '../buttons/UpdateAddressModalButton.svelte';
    import RemoveAddressModalButton from '../buttons/RemoveAddressModalButton.svelte';
    import FullAddress from './FullAddress.svelte';

    export let information, loading = false, isSelected = false, primary, secondary;
    const dispatch = createEventDispatcher();
</script>

<style>
    /* your styles go here */
</style>

<FullAddress {information} />
<div class="pt-3 flex-center-middle flex-col lg:flex-row">
    <div class="mr-0 {isSelected ? '' : 'lg:mr-6'} mb-4 lg:mb-0">
        {#if primary === "update"}
            <UpdateAddressModalButton {information} disabled={loading} />
        {:else if primary === "remove"}
            <RemoveAddressModalButton {information} disabled={loading} />
        {/if}
    </div>
    {#if isSelected}
        <span class="absolute bottom-0 right-0 rounded-full p-2">
            <CheckCircleIcon size={6} color="success" />
        </span>
    {:else}
        <div class="ml-0 lg:ml-6">
            {#if secondary === "select"}
                <AddressSidebarButton type={information.type} />
            {:else if secondary === "choose"}
               <ChooseAddressButton item={information} on:loading={({ detail }) => dispatch('loading', {loading: detail.loading})} /> 
            {/if}
        </div>
    {/if}
</div>