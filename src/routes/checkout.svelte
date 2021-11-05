<script>
    import { cart } from "../lib/stores";
    import { Moon } from 'svelte-loading-spinners';
</script>

{#if !$cart}
    <section>
        <Moon size="260" color="#FF3E00" unit="px" />
    </section>
{:else}
    <pre>{JSON.stringify($cart, null, 2)}</pre>
{/if}