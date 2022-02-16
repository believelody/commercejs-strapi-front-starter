<script>
    import {t} from '$lib/i18n';
    import {profile} from '$lib/stores';
    import AuthForm from '../forms/AuthForm.svelte';
    import GuestForm from '../forms/GuestForm.svelte';
    import CheckboxInput from "../../elements/input/CheckboxInput.svelte";

    let isGuest = false;
</script>

<style>
    /* your styles go here */
</style>

<div class="mx-2 md:mx-12">
    <h3 class="uppercase tracking-wide text-md font-semibold text-neutral-dark my-2">{$t("identity.title")}</h3>
    {#if isGuest}
        <GuestForm />
    {:else}
        {#if $profile?.customer}
            <div class="py-4 text-lg bg-white shadow-md rounded text-neutral-dark flex flex-col items-center justify-center">
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
        <CheckboxInput
                bind:checked={isGuest}
                name="guest"
                label={$t("identity.guest.checkbox")}
        />
    {/if}
</div>