<script>
    import { onMount } from "svelte";
    import { navigating } from '$app/stores';
    import { jwt, orders } from '$lib/stores';
    import MoonLoading from "../loading/MoonLoading.svelte";
import CenterSection from "../center-section/CenterSection.svelte";

    let isAuth = false;

    onMount(() => {
        if ($jwt) {
            isAuth = true;
        } else {
            if (window) {
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