<script>
    import { onMount } from "svelte";
    import { navigating } from '$app/stores';
    import Moon from "svelte-loading-spinners/dist/ts/Moon.svelte";
    import { jwt } from '$lib/stores';
    import Loading from "../loading/Loading.svelte";

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
    <Loading>
        <Moon size="260" color="#FF3E00" unit="px" />
    </Loading>
{:else}
    <slot />
{/if}