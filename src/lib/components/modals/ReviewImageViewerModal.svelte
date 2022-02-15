<script>
	import Gallery from '$lib/elements/gallery/Gallery.svelte';

	export let images, selectedIndex;
</script>

<Gallery {images} {selectedIndex} />

<style>
	/* your styles go here */
</style>
