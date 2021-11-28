<script>
    import {t} from '$lib/i18n';
    import {user} from '$lib/stores';
    import AuthForm from '../form/AuthForm.svelte';
    import GuestForm from '../form/GuestForm.svelte';
    import RegisterSuccessModal from '../modal/RegisterSuccessModal.svelte';
    import {getContext} from "svelte";
    import CheckboxField from "../field/CheckboxField.svelte";

    let isGuest = false;
    const {open} = getContext("simple-modal");

    function showRegisterSuccessModal({success, data}) {
        if (success) {
            open(RegisterSuccessModal, {fullname: `${data.firstname} ${data.lastname}`});
        }
    }
</script>

<style>
    /* your styles go here */
</style>

<div class="mx-2 md:mx-12 rounded-md mb-8">
    <h2 class="uppercase tracking-wide text-lg font-semibold text-gray-700 my-2">{$t("identity.title")}</h2>
    {#if isGuest}
        <GuestForm bind:data={$user} />
    {:else}
        {#if !$user.customer}
            <div class="mb-3 py-4 bg-white shadow-lg rounded text-gray-600 flex flex-col items-center justify-center">
                <span class="font-medium">{$t("identity.greetings.name", { name: `${$user.customer.firstname} ${$user.customer.lastname}`})}</span>
                <span>{$t("identity.greetings.email", { email: `${$user.customer.email}` })}</span>
                {#if $user.customer.phone}
                    <span>{$t("identity.greetings.phone", { phone: `${$user.customer.phone}` })}</span>
                {/if}
            </div>
        {:else}
            <AuthForm on:registerEvent={e => showRegisterSuccessModal(e.detail)} />
        {/if}
    {/if}
    {#if !$user.customer}
        <CheckboxField
                bind:checked={{isGuest}}
                name="guest"
                label={$t("identity.guest.checkbox")}
        />
    {/if}
</div>