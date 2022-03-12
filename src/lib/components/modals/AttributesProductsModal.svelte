<script>
	import ModalWrapper from '$elements/modal/ModalWrapper.svelte';
	import AttributesProducts from '../products/AttributesProducts.svelte';

    export let attributes;
</script>

<ModalWrapper>
	<AttributesProducts {attributes} />
</ModalWrapper>

<style>
	/* your styles go here */
</style>
