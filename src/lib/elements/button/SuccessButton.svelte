<script>
    import Button from "./Button.svelte";

    export let outlined = false;

    let className = "";

    export { className as class };
</script>

<style>
    /* your styles go here */
</style>

<Button on:click class="{outlined ? 'btn-outlined-success' : 'btn-success'} {className || ''}" {...$$restProps}>
    <slot />
</Button>