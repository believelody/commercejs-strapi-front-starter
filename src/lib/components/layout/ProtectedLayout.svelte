<script>
    import { onMount } from "svelte";
    import { goto } from "$app/navigation";
    import { user } from "$lib/stores";

    onMount(() => {
        if (!$user) {
            goto("/sign-in");
        }
    });
</script>

{#if $user}
    <slot />
{:else}
    <div>Loading...</div>
{/if}