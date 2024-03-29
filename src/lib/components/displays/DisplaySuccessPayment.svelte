<script>
	import { t } from '$lib/i18n';
	import { resetStores } from '$lib/stores';
	import CheckCircleIcon from '$elements/icon/CheckCircleIcon.svelte';
	import FullAddress from '../addresses/FullAddress.svelte';
	import { modal } from '$elements/modal/Modal.svelte';

	export let live, user, shipping, billing, isBillingSameAsShipping, reference, conditionals;
	let dataUser = user;

	function close() {
		resetStores();
		modal.closeAll();
	}
</script>

<div>
	<div class="flex flex-col justify-center">
		<h3 class="flex items-center border-b border-neutral-200 pb-2" id="modal-title">
			<span class="bg-green-100 rounded-full"><CheckCircleIcon size={12} /></span>
			<span class="ml-4 text-lg leading-6 font-medium text-neutral-900"
				>{$t('checkout.payment.success.title')}</span
			>
		</h3>
		<h3 class="mt-2 w-full text-lg leading-6 text-neutral-800">
			{$t('checkout.payment.success.order-reference', {
				name: `${dataUser.firstname} ${dataUser.lastname}`,
				reference
			})}
		</h3>
		<div class="mt-2">
			<p class="text-md text-neutral-dark">
				{$t('checkout.payment.success.subtitle')}
			</p>
			<ul class="text-md text-neutral-dark list-disc list-inside">
				{#each live.line_items as item}
					<li>
						{item.name} x {item.quantity}
						{item.variants.length
							? `- ${item.variants
									.map((variant) => `${variant.variant_name} : ${variant.option_name}`)
									.join(' , ')}`
							: ''}
					</li>
				{/each}
			</ul>
			<p class="text-md text-neutral-dark">
				{$t('checkout.payment.success.subtotal')} : {live.subtotal.formatted_with_symbol}
			</p>
		</div>
		{#if conditionals.has_physical_delivery}
			<div class="my-2 flex justify-start">
				<section class="text-neutral-dark mr-4">
					{$t(
						`checkout.payment.success.${
							isBillingSameAsShipping ? 'shipping-billing' : 'shipping'
						}.title`
					)} :
				</section>
				<section class="flex flex-col grow text-md text-neutral-dark">
					<FullAddress information={shipping} />
				</section>
			</div>
			{#if !isBillingSameAsShipping}
				<div class="mt-2 flex justify-start">
					<section class="text-neutral-dark mr-4">
						{$t(`checkout.payment.success.billing.title`)} :
					</section>
					<section class="flex flex-col grow text-md text-neutral-dark">
						<FullAddress information={billing} />
					</section>
				</div>
			{/if}
		{/if}
		<div class="mt-2">
			<p class="text-md text-neutral-dark">
				{$t('checkout.payment.success.shipping-method')} : {live.shipping.description}
			</p>
			<p class="text-md text-neutral-dark">
				{$t('checkout.payment.success.shipping-cost')} : {live.shipping.price.formatted_with_symbol}
			</p>
		</div>
		<div class="mt-2 pt-2 border-t border-neutral-200">
			<p class="text-lg text-center font-medium text-neutral-dark">
				{$t('checkout.payment.success.total')} : {live.total.formatted_with_symbol}
			</p>
		</div>
	</div>
	<div class="bg-neutral-50 px-4 py-3 sm:px-6 flex justify-center">
		<button
			on:click={close}
			class="mt-3 w-full inline-flex justify-center rounded-md border border-neutral-300 shadow-sm px-4 py-2 bg-white text-base font-medium text-neutral-700 hover:bg-neutral-50 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-indigo-500 sm:mt-0 sm:ml-3 sm:w-auto sm:text-sm"
		>
			{$t('checkout.payment.success.modal.close')}
		</button>
	</div>
</div>

<style>
	/* your styles go here */
</style>
