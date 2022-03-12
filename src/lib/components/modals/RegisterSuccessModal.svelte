<script>
    import { t } from '$lib/i18n';
    import InfoModal from '$elements/modal/InfoModal.svelte';

    export let fullname;
</script>

<style>
    /* your styles go here */
</style>

<InfoModal
    status="success"
    title={$t("auth.success.title", { name: fullname })}
    description={$t("auth.success.description")}
/>