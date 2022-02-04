<script>
	import ModalBox from '../box/ModalBox.svelte';

	import Gallery from '../gallery/Gallery.svelte';

	export let images, selectedIndex;
</script>

<Gallery {images} {selectedIndex} />

<style>
	/* your styles go here */
</style>
