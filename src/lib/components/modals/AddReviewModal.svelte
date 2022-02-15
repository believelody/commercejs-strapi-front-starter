<script>
    import { getContext } from 'svelte';
    import api from '$lib/api';
    import { reviewsUser } from "$lib/stores";
    import Box from "$lib/elements/box/Box.svelte";
    import ReviewForm from "../forms/ReviewForm.svelte";

    export let item, review;
    
    const { close } = getContext("simple-modal");

    async function closeModal() {
        const res = await api.review.getFromUser();
        $reviewsUser = res.success ? res.reviews : [];
        close();
    }
</script>

<style>
    /* your styles go here */
</style>

<Box>
    <ReviewForm on:submitEvent={closeModal} {item} {review} withoutShadow />
</Box>