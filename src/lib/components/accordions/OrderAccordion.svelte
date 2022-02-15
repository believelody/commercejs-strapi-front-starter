<script>
    import Accordion from "../../elements/accordion/Accordion.svelte";

    export let isOpen;
</script>

<style>
    /* your styles go here */
</style>

<Accordion {isOpen} class="rounded bg-white mb-2 w-full shadow-md">
    <svelte:fragment slot="header">
        <slot name="header" />
    </svelte:fragment>
    <svelte:fragment slot="content">
        <slot name="content" />
    </svelte:fragment>
</Accordion>