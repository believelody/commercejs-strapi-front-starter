<script>
	import { t } from "$lib/i18n";
	import PrimaryButton from "$elements/button/PrimaryButton.svelte";
	import Form from "$elements/form/Form.svelte";
    import TextInput from "$elements/input/TextInput.svelte";

	let email, loading = false;

	function submit() {
		
	}
</script>

<div class="flex flex-wrap sm:flex-no-wrap justify-center items-center md:justify-start">
	<Form on:submit={submit} class="w-full" withoutShadow>
		<h2 slot="header" class="title-font font-medium text-gray-900 tracking-widest text-sm mb-3 uppercase">
			{$t('footer.subscription.title')}
		</h2>
		<div slot="content" class="grid grid-cols-1 gap-4">
			<TextInput
				placeholder={$t('footer.subscription.placeholder')}
				name="email"
				on:input={({ target }) => email = target.value}
				class="lg:col-span-2 bg-white rounded text-base outline-none text-neutral-dark leading-8"
			/>
			<PrimaryButton class="lg:col-start-3">{$t('footer.subscription.cta')}</PrimaryButton>
		</div>
	</Form>
	<p class="text-gray-500 text-sm mt-2 md:text-left text-center">
		{$t('footer.subscription.description')}
	</p>
</div>
<style>
	/* your styles go here */
</style>
