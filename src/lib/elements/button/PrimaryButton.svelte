<script>
    import Button from "./Button.svelte";

    export let variant = "default";

    let className;

    export { className as class };
</script>

<style>
    /* your styles go here */
</style>

<Button on:click class="btn-primary {className || ''}" {...$$restProps}>
    <slot />
</Button>