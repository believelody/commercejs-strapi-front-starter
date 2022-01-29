<script>
    import { getContext } from 'svelte'; 
    import ModalBox from "../box/ModalBox.svelte";
    import ReviewForm from "../form/ReviewForm.svelte";

    export let item, review;

    const { close } = getContext("simple-modal");
</script>

<style>
    /* your styles go here */
</style>

<ModalBox>
    <ReviewForm on:submitEvent={close} {item} {review} withoutShadow />
</ModalBox>