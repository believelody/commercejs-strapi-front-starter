<script>
    import Button from "./Button.svelte";

    let className;

    export { className as class };
</script>

<style>
    /* your styles go here */
</style>

<Button on:click class="btn-link {className || ''}" {...$$restProps}>
    <slot />
</Button>