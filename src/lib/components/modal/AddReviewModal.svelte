<script>
    import { getContext } from 'svelte';
    import api from '$lib/api';
    import { reviews } from "$lib/stores";
    import ModalBox from "../box/ModalBox.svelte";
    import ReviewForm from "../form/ReviewForm.svelte";

    export let item, review;
    
    const { close } = getContext("simple-modal");

    async function closeModal() {
        const res = await api.review.getFromUser();
        $reviews = res.success ? res.reviews : [];
        close();
    }
</script>

<style>
    /* your styles go here */
</style>

<ModalBox>
    <ReviewForm on:submitEvent={closeModal} {item} {review} withoutShadow />
</ModalBox>