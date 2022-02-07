<script>
    import {getContext, onMount} from 'svelte';
    import {page} from '$app/stores';
    import {t} from '$lib/i18n';
    import api from '$lib/api'
    import {profile, user} from '$lib/stores';
    import ConfirmationEmailModal from '../../lib/components/modal/ConfirmationEmailModal.svelte';
    import ProtectedLayout from '../../lib/components/layout/ProtectedLayout.svelte';
    import LogoutIcon from '../../lib/components/svg/LogoutIcon.svelte';
    import ImageUploadField from "../../lib/components/field/ImageUploadField.svelte";

    const {open} = getContext("simple-modal");

    function logout() {
        api.auth.logout();
    }

    onMount(async () => {
        if ($user.confirmed) {
            if (!$profile) {
                await api.auth.getMe();
            }
            if (!$profile?.addresses) {
                await api.address.getAll();
            }
        } else {
            open(ConfirmationEmailModal);
            if (window) {
                window.history.back();
            }
        }
    });
</script>

<div class="container flex justify-space-between mx-auto mt-4">
    <aside class="sticky top-0 inset-x-0 xs:hidden md:w-1/3 xl:w-1/4 h-full border shadow-lg rounded flex flex-col md:mr-2 xl:mr-6">
        <ImageUploadField name="image" on:upload={e => console.log(e.detail)} class="w-full rounded-tl rounded-tr bg-gray-300 h-96" />
        <h3 class="font-medium text-md text-center py-4 border-b border-t border-gray-300">
            {#if $profile}
                {$profile.customer.firstname} {$profile.customer.lastname}
            {:else}
                {$t("common.update")}
            {/if}
        </h3>
        <nav class="flex flex-col h-auto">
            <a class="px-2 py-2 {$page.path === "/my-account" ? "font-medium border-l-8 border-l-indigo-200" : ""} border-b border-gray-300 hover:bg-gray-200" href="/my-account">{$t("account.dashboard.link")}</a>
            <a class="px-2 py-2 {$page.path === "/my-account/orders" ? "font-medium border-l-8 border-l-indigo-200" : ""} border-b border-gray-300 hover:bg-gray-200" href="/my-account/orders?page=1">{$t("account.orders.link")}</a>
            <a class="px-2 py-2 {$page.path === "/my-account/profile" ? "font-medium border-l-8 border-l-indigo-200" : ""} border-b border-gray-300 hover:bg-gray-200" href="/my-account/profile">{$t("account.profile.link")}</a>
            <a class="px-2 py-2 {$page.path === "/my-account/addresses" ? "font-medium border-l-8 border-l-indigo-200" : ""} border-b border-gray-300 hover:bg-gray-200" href="/my-account/addresses">{$t("account.addresses.link")}</a>
            <a class="px-2 py-2 {$page.path === "/my-account/wishlist" ? "font-medium border-l-8 border-l-indigo-200" : ""} border-b border-gray-300 hover:bg-gray-200" href="/my-account/wishlist">{$t("account.wishlist.link")}</a>
            <a class="px-2 py-2 {$page.path === "/my-account/reviews" ? "font-medium border-l-8 border-l-indigo-200" : ""} border-b border-gray-300 hover:bg-gray-200" href="/my-account/reviews">{$t("account.reviews.link")}</a>
            <button on:click={logout} class="relative w-full py-2 hover:bg-gray-200">
                <span class="absolute left-2 top-1"><LogoutIcon /></span>
                <span>{$t("account.logout")}</span>
            </button>
        </nav>
    </aside>
    <article class="relative bg-indigo-100 flex-grow flex flex-col items-center md:w-2/3 xl:w-3/4 xl:ml-6 border rounded shadow-lg">
        <ProtectedLayout>
            <slot />
        </ProtectedLayout>
    </article>
</div>