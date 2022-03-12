<script>
    import api from '$api';
    import { reviewsUser } from "$lib/stores";
    import ReviewForm from "../forms/ReviewForm.svelte";
    import ModalWrapper from '$elements/modal/ModalWrapper.svelte';
    import { closeModal } from '$elements/modal/Modal.svelte';

    export let item, review;
    
    async function close() {
        const res = await api.review.getFromUser();
        $reviewsUser = res.success ? res.reviews : [];
        closeModal();
    }
</script>

<style>
    /* your styles go here */
</style>

<ModalWrapper>
    <ReviewForm on:submitEvent={close} {item} {review} withoutShadow />
</ModalWrapper>