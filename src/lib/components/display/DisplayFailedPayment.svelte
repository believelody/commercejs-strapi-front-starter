<script>
    import { modal } from '$lib/stores';
    import { t } from '$lib/i18n';
    import DangerIcon from '$lib/components/svg/DangerIcon.svelte';
</script>

<style>
    /* your styles go here */
</style>

<div>
    <div class="flex flex-col justify-center">
        <h3 class="flex items-center" id="modal-title">
            <span class="bg-red-100 p-1 rounded-full"><DangerIcon size={12} /></span>
            <span class="ml-4 text-lg leading-6 font-medium text-gray-900">{$t('checkout.payment.failed.title')}</span>
        </h3>
        <div class="mt-2">
            <p class="text-md text-gray-600">
                {$t("checkout.payment.failed.subtitle")}
            </p>
        </div>
    </div>
    <div class="bg-gray-50 px-4 py-3 sm:px-6 sm:flex sm:flex-row-reverse">
        <button
            on:click={() => $modal = null}
            class="mt-3 w-full inline-flex justify-center rounded-md border border-gray-300 shadow-sm px-4 py-2 bg-white text-base font-medium text-gray-700 hover:bg-gray-50 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-indigo-500 sm:mt-0 sm:ml-3 sm:w-auto sm:text-sm"
        >
            {$t("checkout.payment.failed.action.back-to-checkout")}
        </button>
    </div>
</div>