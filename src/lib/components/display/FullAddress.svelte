<script>
    import { createEventDispatcher } from 'svelte';
    import { t } from '$lib/i18n';
    import AddressSidebarButton from '../button/AddressSidebarButton.svelte';
    import CheckCircleIcon from '../svg/CheckCircleIcon.svelte';
    import ChooseAddressButton from '../button/ChooseAddressButton.svelte';
    import UpdateAddressModalButton from '../button/UpdateAddressModalButton.svelte';
    import RemoveAddressModalButton from '../button/RemoveAddressModalButton.svelte';

    export let information, loading, isSelected = false, primary, secondary;
    const dispatch = createEventDispatcher();
</script>

<style>
    /* your styles go here */
</style>

{#if information.title}
    <span>{information.title}</span>
{/if}
<span>{information.address1}</span>
{#if information.address2}
    <span>{information.address2}</span>
{/if}
<span>{information.zip} {information.city}</span>
{#if information.subdivision}
    <span>{information.subdivision.value}</span>
{/if}
<span>{$t(`country.${information.country.key.toLowerCase()}`)}</span>
<div class="pt-3 flex flex-col lg:flex-row items-center justify-center">
    <div class="mr-0 {isSelected ? "" : "lg:mr-6"} mb-4 lg:mb-0">
        {#if primary === "update"}
            <UpdateAddressModalButton {information} disabled={loading} />
        {:else if primary === "remove"}
            <RemoveAddressModalButton {information} disabled={loading} />
        {/if}
    </div>
    {#if isSelected}
        <span class="absolute bottom-0 right-0 rounded-full p-2">
            <CheckCircleIcon size={6} />
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