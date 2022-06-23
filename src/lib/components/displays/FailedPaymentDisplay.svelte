<script>
	import { t } from '$lib/i18n';
	import DangerIcon from '$elements/icon/DangerIcon.svelte';
	import { modal } from '$elements/modal/Modal.svelte';
</script>

<div>
	<div class="flex flex-col justify-center">
		<h3 class="flex items-center" id="modal-title">
			<span class="bg-red-100 p-1 rounded-full"><DangerIcon size={12} /></span>
			<span class="ml-4 text-lg leading-6 font-medium text-neutral-900"
				>{$t('checkout.payment.failed.title')}</span
			>
		</h3>
		<div class="mt-2">
			<p class="text-md text-neutral-dark">
				{$t('checkout.payment.failed.subtitle')}
			</p>
		</div>
		<div class="mt-2">
			{@html $t('checkout.payment.failed.html-description')}
		</div>
	</div>
	<div class="bg-neutral-50 px-4 py-3 sm:px-6 sm:flex sm:flex-row-reverse">
		<button
			on:click={modal.closeAll}
			class="mt-3 w-full inline-flex justify-center rounded-md border border-neutral-300 shadow-sm px-4 py-2 bg-white text-base font-medium text-neutral-700 hover:bg-neutral-50 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-indigo-500 sm:mt-0 sm:ml-3 sm:w-auto sm:text-sm"
		>
			{$t('checkout.payment.failed.action.back-to-checkout')}
		</button>
	</div>
</div>

<style>
	/* your styles go here */
</style>
