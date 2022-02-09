<script>
	import { t } from "$lib/i18n";
	import InputField from "../field/InputField.svelte";

	let email, loading = false;

	function submit() {
		
	}
</script>

<h2 class="title-font font-medium text-gray-900 tracking-widest text-sm mb-3 uppercase">
	{$t('footer.subscription.title')}
</h2>
<form on:submit|preventDefault={submit} class="flex flex-wrap sm:flex-no-wrap justify-center items-center md:justify-start">
	<div class="w-full sm:w-80 xl:mr-4 sm:mr-4 mr-0">
		<InputField
			placeholder={$t('footer.subscription.placeholder')}
			name="email"
			on:input={({ target }) => email = target.value}
			class="w-full bg-gray-100 bg-opacity-50 rounded text-base outline-none text-gray-700 leading-8"
		/>
	</div>
	<button
		class="mt-2 sm:mt-0 w-full sm:w-auto text-center text-white bg-indigo-500 border-0 py-2 px-6 focus:outline-none hover:bg-indigo-600 rounded"
		>{$t('footer.subscription.cta')}</button
	>
</form>
<p class="text-gray-500 text-sm mt-2 md:text-left text-center">
	{$t('footer.subscription.description')}
</p>

<style>
	/* your styles go here */
</style>
