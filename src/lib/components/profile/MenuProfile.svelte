<script>
    import { page } from "$app/stores";
    import api from "$lib/api";
    import { t } from "$lib/i18n";
    import { profile } from "$lib/stores";
    import ImageUploadField from "../field/ImageUploadField.svelte";
    import LogoutIcon from "../svg/LogoutIcon.svelte";

    function logout() {
        api.auth.logout();
    }
</script>

<style>
    /* your styles go here */
</style>


<ImageUploadField name="image" on:upload={e => console.log(e.detail)} class="w-full rounded-tl rounded-tr bg-gray-300 h-96" />
<p class="font-medium text-md text-center py-4 border-b border-t border-gray-300">
    {#if $profile}
        {$profile.customer.firstname} {$profile.customer.lastname}
    {:else}
        {$t("common.update")}
    {/if}
</p>
<nav class="flex flex-col h-auto">
    <a class="px-2 py-2 {$page.url.pathname === "/my-account" ? "font-medium border-l-8 border-l-indigo-200" : ""} border-b border-gray-300 hover:bg-gray-200" href="/my-account">{$t("account.dashboard.link")}</a>
    <a class="px-2 py-2 {$page.url.pathname === "/my-account/orders" ? "font-medium border-l-8 border-l-indigo-200" : ""} border-b border-gray-300 hover:bg-gray-200" href="/my-account/orders?page=1">{$t("account.orders.link")}</a>
    <a class="px-2 py-2 {$page.url.pathname === "/my-account/profile" ? "font-medium border-l-8 border-l-indigo-200" : ""} border-b border-gray-300 hover:bg-gray-200" href="/my-account/profile">{$t("account.profile.link")}</a>
    <a class="px-2 py-2 {$page.url.pathname === "/my-account/addresses" ? "font-medium border-l-8 border-l-indigo-200" : ""} border-b border-gray-300 hover:bg-gray-200" href="/my-account/addresses">{$t("account.addresses.link")}</a>
    <a class="px-2 py-2 {$page.url.pathname === "/my-account/wishlist" ? "font-medium border-l-8 border-l-indigo-200" : ""} border-b border-gray-300 hover:bg-gray-200" href="/my-account/wishlist">{$t("account.wishlist.link")}</a>
    <a class="px-2 py-2 {$page.url.pathname === "/my-account/reviews" ? "font-medium border-l-8 border-l-indigo-200" : ""} border-b border-gray-300 hover:bg-gray-200" href="/my-account/reviews">{$t("account.reviews.link")}</a>
    <button on:click={logout} class="relative w-full py-2 hover:bg-gray-200">
        <span class="absolute left-2 top-1"><LogoutIcon /></span>
        <span>{$t("account.logout")}</span>
    </button>
</nav>