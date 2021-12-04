<script>
    import { onMount } from "svelte";
    import { t } from '$lib/i18n';
    import api from '$lib/api';
    import HeaderTitle from '$lib/components/header/HeaderTitle.svelte';
    import CenterSection from '$lib/components/center-section/CenterSection.svelte';

    let reviews = [];

    onMount(async () => {
        reviews = await api.wishlist.getFromUser();
    });
</script>

<style>
    /* your styles go here */
</style>

<div class="relative bg-indigo-100 flex flex-col h-full pb-2">
    <HeaderTitle title={$t("wishlist.account.title")} />
    <ul class="border bg-white mx-2 shadow-md rounded h-full flex flex-col lg:flex-row items-center justify-center">
        {#each reviews as review}
            <li class="w-full lg:w-1/2"></li>
        {:else}
            <CenterSection class="rounded p-6 w-auto bg-indigo-200 flex flex-col justify-center">
                <span>{$t("wishlist.empty.text")}</span>
                <a href="/" class="underline hover:text-blue-700">{$t("wishlist.empty.link")}</a>
            </CenterSection>
        {/each}
    </ul>
</div>