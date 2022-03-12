<script>
	import Gallery from '$elements/gallery/Gallery.svelte';
import ModalWrapper from '$elements/modal/ModalWrapper.svelte';

	export let images, selectedIndex;
</script>

<ModalWrapper>
	<Gallery {images} {selectedIndex} />
</ModalWrapper>
<style>
	/* your styles go here */
</style>
