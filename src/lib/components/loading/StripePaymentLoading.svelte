<script>
    import { Jumper } from 'svelte-loading-spinners';
    import { t } from '$lib/i18n';
</script>

<section class="h-full flex flex-col justify-center items-center">
	<span class="mb-4 font-medium text-lg">{$t('checkout.payment.processing1')},</span>
	<Jumper size="260" color="#FF3E00" unit="px" />
	<span class="mt-4 font-medium text-lg">{$t('checkout.payment.processing2')}.</span>
</section>
