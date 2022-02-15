<script>
    import Button from "./Button.svelte";

    export let icon, shape;
    let className;
    export { className as class }
</script>

<style>
    /* your styles go here */
</style>

<Button {shape} class="{className}" on:click>
    <svelte:component this={icon} {...$$restProps}/>
</Button>