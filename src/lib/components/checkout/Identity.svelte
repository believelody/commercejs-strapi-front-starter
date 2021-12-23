<script>
    import {t} from '$lib/i18n';
    import {profile} from '$lib/stores';
    import AuthForm from '../form/AuthForm.svelte';
    import GuestForm from '../form/GuestForm.svelte';
    import CheckboxField from "../field/CheckboxField.svelte";

    let isGuest = false;
</script>

<style>
    /* your styles go here */
</style>

<div class="mx-2 md:mx-12 rounded-md mb-8">
    <h2 class="uppercase tracking-wide text-lg font-semibold text-gray-700 my-2">{$t("identity.title")}</h2>
    {#if isGuest}
        <GuestForm />
    {:else}
        {#if $profile?.customer}
            <div class="mb-3 py-4 bg-white shadow-lg rounded text-gray-600 flex flex-col items-center justify-center">
                <span class="font-medium">{$t("identity.greetings.name", { name: `${$profile.customer.firstname} ${$profile.customer.lastname}`})}</span>
                <span>{$t("identity.greetings.email", { email: `${$profile.customer.email}` })}</span>
                {#if $profile.customer.phone}
                    <span>{$t("identity.greetings.phone", { phone: `${$profile.customer.phone}` })}</span>
                {/if}
            </div>
        {:else}
            <AuthForm />
        {/if}
    {/if}
    {#if !$profile?.customer}
        <CheckboxField
                bind:checked={isGuest}
                name="guest"
                label={$t("identity.guest.checkbox")}
        />
    {/if}
</div>