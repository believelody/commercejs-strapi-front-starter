<script>
    import { t } from '$lib/i18n';
    import { user } from '$lib/stores';
    import GuestForm from '../form/GuestForm.svelte';
    import LoginForm from '../form/LoginForm.svelte';
    let isGuest = false;
</script>

<style>
    /* your styles go here */
</style>

<div class="mx-2 md:mx-12 rounded-md mb-8">
    <h2 class="uppercase tracking-wide text-lg font-semibold text-gray-700 my-2">{$t("checkout.identity.title")}</h2>
    {#if isGuest}
        <GuestForm bind:data={$user} />
    {:else}
        <LoginForm bind:data={$user} />
    {/if}
    <label for="guest">
        <input id="guest" name="guest" type="checkbox" class:checked={isGuest} bind:checked={isGuest} />
        <span class="px-2 text-gray-600">{$t("checkout.identity.guest.checkbox")}</span>
    </label>
</div>