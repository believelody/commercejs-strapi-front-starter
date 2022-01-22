<script>
    import { t } from '$lib/i18n';    
    import ModalBox from "../box/ModalBox.svelte";
    import ReviewForm from "../form/ReviewForm.svelte";
    import HeaderTitle from "../header/HeaderTitle.svelte";

    export let item, review;
</script>

<style>
    /* your styles go here */
</style>

<ModalBox>
    <ReviewForm {item} {review} withoutShadow />
</ModalBox>