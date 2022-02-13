<script>
    export let collapse = false;
</script>

<style>
    /* your styles go here */
</style>

<div class="relative {$$props.class}" on:click={() => collapse = !collapse}>
    <div class="cursor-pointer">
        <slot name="header" />
    </div>
    {#if collapse}
        <div class="absolute z-50">
            <slot name="content" />
        </div>
    {/if}
</div>