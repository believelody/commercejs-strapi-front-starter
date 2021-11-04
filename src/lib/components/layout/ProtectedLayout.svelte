<script>
import { goto } from "$app/navigation";
import { user } from "$lib/stores";

import { onMount } from "svelte";


    onMount(() => {
        if (!$user) {
            goto("/sign-in");
        }
    })
</script>

{#if $user}
    <slot />
{:else}
    <div>Loading...</div>
{/if}