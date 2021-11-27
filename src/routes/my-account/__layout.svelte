<script>
    import { t } from '$lib/i18n';
    import { profile } from '$lib/stores';
    import ProtectedLayout from '../../lib/components/layout/ProtectedLayout.svelte';
</script>

<ProtectedLayout>
    <div class="container flex justify-space-between mx-auto mt-8">
        <aside class="sticky top-0 inset-x-0 xs:hidden md:w-1/3 xl:w-1/4 h-full border shadow-lg rounded flex flex-col md:mr-2 xl:mr-6">
            <div class="w-full rounded-tl rounded-tr bg-indigo-300 h-96">
                <h3 class="h-full text-md flex flex-col items-center justify-center">
                    <span>{$t("account.image.no-image.text1")}</span>
                    <a href="/" class="underline">{$t("account.image.no-image.text2")}</a>
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
                <a class="px-2 py-2 border-l-8 border-l-gray-300 border-b border-gray-300 hover:bg-gray-200" href="/">{$t("account.dashboard.link")}</a>
                <a class="px-2 py-2 border-b border-gray-300 hover:bg-gray-200" href="/">{$t("account.orders.link")}</a>
                <a class="px-2 py-2 border-b border-gray-300 hover:bg-gray-200" href="/">{$t("account.profile.link")}</a>
                <a class="px-2 py-2 border-b border-gray-300 hover:bg-gray-200" href="/">{$t("account.addresses.link")}</a>
                <a class="px-2 py-2 border-b border-gray-300 hover:bg-gray-200" href="/">{$t("account.wishlist.link")}</a>
                <a class="px-2 py-2 border-b border-gray-300 hover:bg-gray-200" href="/">{$t("account.reviews.link")}</a>
                <button class="w-full py-2 hover:bg-gray-200">{$t("account.logout")}</button>
           </nav>
        </aside>
        <article class="md:w-2/3 xl:w-3/4 xl:ml-6 border rounded shadow-lg">
            <slot />
        </article>
    </div>
</ProtectedLayout>