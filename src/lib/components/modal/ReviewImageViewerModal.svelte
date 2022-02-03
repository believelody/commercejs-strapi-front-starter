<script>
    import Gallery from "../gallery/Gallery.svelte";

    export let images, selectedIndex;
</script>

<style>
    /* your styles go here */
</style>

<Gallery {images} {selectedIndex} />