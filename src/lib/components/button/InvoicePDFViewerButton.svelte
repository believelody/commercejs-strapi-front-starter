<script>
    import { t } from '$lib/i18n';
    import FilePDFIcon from '../svg/FilePDFIcon.svelte';
</script>

<style>
    /* your styles go here */
</style>

<button class="border border-blue-500 rounded px-4 flex items-center justify-center">
    <FilePDFIcon size={4} color="blue-500" />
    <span class="ml-2">{$t("order.account.table.body.button.bill")}</span>
</button>