<script>
	import { t } from '$lib/i18n'
import BankCardIcon from '../svg/BankCardIcon.svelte';
</script>

<div class="mx-2 md:mx-12 rounded-md">
	<section>
		<h2 class="uppercase tracking-wide text-lg font-semibold text-gray-700 my-2">
			{$t("checkout.payment.title")}
		</h2>
		<fieldset class="mb-3 bg-white shadow-lg rounded text-gray-600">
			<label class="flex border-b border-gray-200 h-12 py-3 items-center">
				<span class="text-right px-2">
                    <BankCardIcon />
                </span>
				<input
					name="card"
					class="focus:outline-none px-3 w-full"
					placeholder="{$t("checkout.payment.card-number")} MM/YY CVC"
					required=""
				/>
			</label>
		</fieldset>
	</section>
</div>

<style>
	/* your styles go here */
</style>
