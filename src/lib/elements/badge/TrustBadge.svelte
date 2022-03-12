<script>
    import Card from "$elements/card/Card.svelte";
</script>

<style>
    /* your styles go here */
</style>

<Card class="w-full h-full border-2 border-black" shadow="none">
    <div slot="content">
        <p class="flex justify-center"><slot name="icon" /></p>
        <p class="text-lg font-semibold mx-2 text-center"><slot name="text" /></p>
    </div>
</Card>