<script>
    import { getContext, onMount } from "svelte";
    import { navigating } from '$app/stores';
    import { t } from '$lib/i18n';
    import api from '$lib/api';
    import HeaderTitle from '$lib/components/header/HeaderTitle.svelte';
    import MoonLoading from "../../../lib/components/loading/MoonLoading.svelte";
    import { openDangerModal } from "../../../lib/context/modal";

    let wishlists = [], loading = true;
    const { open } = getContext("simple-modal");

    async function showRemoveWishlisModal(item) {
        openDangerModal(open, {
            title: $t("wishlist.account.remove.modal.title"),
            description: $t("wishlist.account.remove.modal.description"),
            actionCallback: async () => {
                await api.wishlist.update(item);
                await getAll();
            }
        })
    }

    async function getAll() {
        loading = true;
        const res = await api.wishlist.getFromUser();
        if (res.success) {
            wishlists = res.wishlists;
        }
        loading = false;
    }

    onMount(async () => {
        await getAll();
    });
</script>

<style>
    /* your styles go here */
</style>

{#if loading || $navigating}
    <CenterSection>
        <MoonLoading />
    </CenterSection>
{:else}
    <HeaderTitle title={$t("wishlist.account.title")} />
    <ul class="border w-full lg:w-4/5 bg-white shadow-md rounded h-full flex flex-wrap">
        {#each wishlists as wishlist}
            <li class="xl:w-1/3 lg:w-1/2 p-4 w-full">
                <a href="/products/{wishlist.product.permalink}" class="block relative h-48 rounded overflow-hidden">
                    <img
                        alt="{wishlist.product.name}"
                        class="transition duration-500 object-cover hover:object-cover object-center w-full h-full block"
                        src="{wishlist.product.media.source}"
                    />
                </a>
                <div class="mt-4">
                    <h3 class="text-gray-500 text-xs tracking-widest title-font mb-1">
                        <a href="/categories/{wishlist.product.categories.find(() => true).name}">
                            {wishlist.product.categories.find(() => true).name}
                        </a>
                    </h3>
                    <h2 class="text-gray-900 title-font text-lg font-medium">
                        <a href="/products/{wishlist.product.permalink}">{wishlist.product.name}</a>
                    </h2>
                    <p class="mt-1">{wishlist.product.price.formatted_with_symbol}</p>
                </div>
                <div class="mt-2 mx-3 flex flex-col justify-center">
                    <!-- <button class="p-2 mb-2 rounded bg-green-500 text-white font-medium">{$t("wishlist.account.cart.add")}</button> -->
                    <button on:click={() => showRemoveWishlisModal(wishlist)} class="p-2 rounded text-blue-800 border-2 border-red-400 box-border">
                        {$t("wishlist.account.remove.button")}
                    </button>
                </div>
            </li>
        {:else}
            <section class="rounded p-6 my-2 mx-auto h-24 bg-indigo-200 flex flex-col justify-center">
                <span>{$t("wishlist.empty.text")}</span>
                <a href="/" class="underline hover:text-blue-700">{$t("wishlist.empty.link")}</a>
            </section>
        {/each}
    </ul>
{/if}