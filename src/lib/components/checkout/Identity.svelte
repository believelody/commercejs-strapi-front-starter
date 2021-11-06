<script>
    import { t } from '$lib/i18n'
    import LoginForm from '../form/LoginForm.svelte';
    let isGuest = false;
</script>

<style>
    /* your styles go here */
</style>

<div class="mx-2 md:mx-12 rounded-md mb-8">
    <h2 class="uppercase tracking-wide text-lg font-semibold text-gray-700 my-2">{$t("checkout.identity.title")}</h2>
    {#if isGuest}
        <section class="mb-3 bg-white shadow-lg rounded text-gray-600">
            <p class="text-center py-12 px-8 md:px-4 xl:px-0 flex items-center justify-center">
                {$t("checkout.identity.guest.text")}
            </p>
        </section>
    {:else}
        <LoginForm />
    {/if}
    <label for="guest">
        <input id="guest" name="guest" type="checkbox" class:checked={isGuest} bind:checked={isGuest} />
        <span class="px-2 text-gray-600">{$t("checkout.identity.guest.checkbox")}</span>
    </label>
</div>