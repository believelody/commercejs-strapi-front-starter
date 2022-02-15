<script>
    import Button from "./Button.svelte";

    export let underlined = false, underlinedOnHover = false;
    let className;

    export { className as class };
</script>

<style>
    /* your styles go here */
</style>

<Button on:click class="btn-link {underlined ? 'underline' : ''} {underlinedOnHover ? 'hover:underline' : ''} {className || ''}" {...$$restProps}>
    <slot />
</Button>