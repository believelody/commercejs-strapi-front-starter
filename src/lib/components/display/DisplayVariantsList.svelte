<script>
    export let variants, style = "none";

    function selectStyleList() {
        switch (style) {
            case "disc":
                return "disc";
            case "decimal":
                return "decimal";
            case "dash":
            default:
                return "none";
        }
    }
</script>

<style>
    /* your styles go here */
</style>

<ul class="list-inside list-{selectStyleList()}">
{#each variants as variant}
    <li class="mr-2">
        {#if style === "dash"}
            <span class="font-medium mr-3">-</span>
        {/if}
        <span>{variant.variant_name} : {variant.option_name}</span>
    </li>
{/each}
</ul>