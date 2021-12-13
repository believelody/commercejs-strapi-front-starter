<script>
    import { getContext, onMount } from "svelte";
    import { navigating } from '$app/stores';
    import { t } from '$lib/i18n';
    import api from '$lib/api';
    import HeaderTitle from '$lib/components/header/HeaderTitle.svelte';
    import DangerModal from "$lib/components/modal/DangerModal.svelte";
import MoonLoading from "../../../lib/components/loading/MoonLoading.svelte";

    let reviews = [], loading = true;

    async function getAll() {
        loading = true;
        const res = await api.review.getFromUser();
        if (res.success) {
            reviews = res.reviews;
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
    <MoonLoading />
{:else}
    <HeaderTitle title={$t("review.account.title")} />
    <ul class="relative border w-full lg:w-4/5 bg-white mx-2 shadow-md rounded h-full flex flex-wrap">
        {#each reviews as review}
            <li class="xl:w-1/3 lg:w-1/2 p-4 w-full">
            </li>
        {:else}
            <section class="rounded p-6 my-2 mx-auto h-24 bg-indigo-200 flex flex-col justify-center">
                <span>{$t("review.empty.text")}</span>
                <a href="orders?page=1" class="underline hover:text-blue-700">{$t("review.empty.link")}</a>
            </section>
        {/each}
    </ul>
{/if}