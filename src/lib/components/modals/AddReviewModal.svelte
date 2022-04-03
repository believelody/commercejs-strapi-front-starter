<script>
	import api from '$api';
	import { reviewsUser } from '$lib/stores';
	import ReviewForm from '../forms/ReviewForm.svelte';
	import ModalWrapper from '$elements/modal/ModalWrapper.svelte';
	import { modal } from '$lib/elements/modal/Modal.svelte';

	export let item, review, modalId;

	async function close(modalId) {
		const res = await api.review.getFromUser();
		$reviewsUser = res.success ? res.reviews : [];
		modal.close(modalId);
	}
</script>

<ModalWrapper>
	<ReviewForm on:submitEvent={() => close(modalId)} {item} {review} withoutShadow />
</ModalWrapper>

<style>
	/* your styles go here */
</style>
