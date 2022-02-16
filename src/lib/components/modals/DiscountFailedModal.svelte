<script>
    import {t} from '$lib/i18n';
    import InfoModal from "../../elements/modal/InfoModal.svelte";
</script>

<style>
    /* your styles go here */
</style>

<InfoModal
    title={$t("discount.failed.title")}
    description={$t("discount.failed.description")}
    status="danger"
    iconBgShade="light"
/>