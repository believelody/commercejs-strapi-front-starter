<script>
    import { page } from '$app/stores';
    import { t } from '$lib/i18n';
    import { profile } from '$lib/stores';
    import ProtectedLayout from '../../lib/components/layout/ProtectedLayout.svelte';
import LogoutIcon from '../../lib/components/svg/LogoutIcon.svelte';
</script>

<ProtectedLayout>
    <div class="container flex justify-space-between mx-auto mt-8">
        <aside class="sticky top-0 inset-x-0 xs:hidden md:w-1/3 xl:w-1/4 h-full border shadow-lg rounded flex flex-col md:mr-2 xl:mr-6">
            <div class="w-full rounded-tl rounded-tr bg-indigo-300 h-96">
                <h3 class="h-full text-md flex flex-col items-center justify-center">
                    <span>{$t("account.image.no-image.text1")}</span>
                    <a href="/" class="underline hover:text-blue-800">{$t("account.image.no-image.text2")}</a>
                </h3>
            </div>
            <h3 class="font-medium text-md text-center py-4 border-b border-gray-300">
                {#if $profile}
                    {$profile.customer.firstname} {$profile.customer.lastname}
                {:else}
                    {$t("common.update")}
                {/if}
            </h3>
            <nav class="flex flex-col h-auto">
                <a class="px-2 py-2 {$page.path === "/my-account" ? "border-l-8 border-l-indigo-200" : ""} border-b border-gray-300 hover:bg-gray-200" href="/my-account">{$t("account.dashboard.link")}</a>
                <a class="px-2 py-2 {$page.path === "/my-account/orders" ? "border-l-8 border-l-indigo-200" : ""} border-b border-gray-300 hover:bg-gray-200" href="/my-account/orders">{$t("account.orders.link")}</a>
                <a class="px-2 py-2 {$page.path === "/my-account/profile" ? "border-l-8 border-l-indigo-200" : ""} border-b border-gray-300 hover:bg-gray-200" href="/my-account/profile">{$t("account.profile.link")}</a>
                <a class="px-2 py-2 {$page.path === "/my-account/addresses" ? "border-l-8 border-l-indigo-200" : ""} border-b border-gray-300 hover:bg-gray-200" href="/my-account/addresses">{$t("account.addresses.link")}</a>
                <a class="px-2 py-2 {$page.path === "/my-account/whishlist" ? "border-l-8 border-l-indigo-200" : ""} border-b border-gray-300 hover:bg-gray-200" href="/my-account/wishlist">{$t("account.wishlist.link")}</a>
                <a class="px-2 py-2 {$page.path === "/my-account/reviews" ? "border-l-8 border-l-indigo-200" : ""} border-b border-gray-300 hover:bg-gray-200" href="/my-account/reviews">{$t("account.reviews.link")}</a>
                <button class="relative w-full py-2 hover:bg-gray-200">
                    <span class="absolute left-2 top-1"><LogoutIcon /></span>
                    <span>{$t("account.logout")}</span>
                </button>
           </nav>
        </aside>
        <article class="relative md:w-2/3 xl:w-3/4 xl:ml-6 border rounded shadow-lg">
            <slot />
        </article>
    </div>
</ProtectedLayout>