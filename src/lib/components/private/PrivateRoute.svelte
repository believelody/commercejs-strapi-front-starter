<script>
    import { onMount } from "svelte";
    import { browser } from '$app/env';
    import { navigating } from '$app/stores';
    import { jwt, orders } from '$lib/stores';
    import MoonLoading from "../loading/MoonLoading.svelte";
    import CenterSection from "$elements/center-section/CenterSection.svelte";

    let isAuth = false;

    onMount(() => {
        if ($jwt) {
            isAuth = true;
        } else {
            if (browser) {
                window.history.back();
            }
        }
    });
</script>

{#if (!isAuth || $navigating) && !$orders.length}
    <CenterSection>
        <MoonLoading />
    </CenterSection>
{:else}
    <slot />
{/if}