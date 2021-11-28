<script>
    import { onMount } from "svelte";
    import { navigating } from '$app/stores';
    import { jwt } from '$lib/stores';
    import MoonLoading from "../loading/MoonLoading.svelte";

    let isAuth = false;

    onMount(() => {
        if (jwt) {
            isAuth = true;
        } else {
            if (window) {
                window.history.back();
            }
        }
    });
</script>

{#if !isAuth || $navigating}
    <MoonLoading />
{:else}
    <slot />
{/if}