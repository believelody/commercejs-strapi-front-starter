<script>
	import { beforeUpdate, createEventDispatcher, onMount } from 'svelte';
	import { t } from '$lib/i18n';
	import api from '$api';
	import TextInput from '$elements/input/TextInput.svelte';
	import Search from '$elements/input/SearchInput.svelte';
	import Form from '$elements/form/Form.svelte';
	import { onInput, requiredFieldsValidation } from '$utils/form.util';
	import { modal } from '$elements/modal/Modal.svelte';
	import { shipping } from '$lib/stores';

	export let information = {},
		type = '',
		title,
		hideSubmitButton = false,
		submitLabel = '',
		withoutShadow = false,
		hideTitleAddress = false,
		action = '',
		headerClass = '',
		contentClass = '';
	let countries = [],
		subdivisions = [],
		loading = false,
		hasError = false;
	const dispatch = createEventDispatcher();

	async function submit() {
		if (action) {
			modal.disableCloseModal();
			loading = true;
			hasError = false;
			const res = await api.address[action]({ ...information, type });
			if (res.success) {
				loading = false;
				dispatch('submitEvent');
			} else {
				modal.resetModalCloseOptions();
				hasError = true;
			}
		}
	}

	async function getCountries() {
		const res = await api.address.getCountries();
		if (res.success) {
			countries = res.countries;
		}
	}

	// async function getSubdivisions(countryCode) {
	//     const res = await api.address.getSubdivisions(countryCode);
	//     if (res.success) {
	//         return res.subdivisions;
	//     }
	// }

	onMount(async () => {
		await getCountries();
	});

	beforeUpdate(() => {
		console.log("address form updated");
	});

	// $: information.country && getSubdivisions(information.country.key).then(res => subdivisions = res);
	$: isValid = requiredFieldsValidation(information, ['address1', 'city', 'zip', 'country']);
</script>

<Form id="address-form" on:submit={submit} {withoutShadow}>
	<h3
		slot="header"
		class="uppercase tracking-wide font-semibold text-neutral-dark my-2 {headerClass}"
	>
		{title}
	</h3>
	<div slot="content" class="p-2 grid grid-cols-1 gap-2 {contentClass}">
		{#if !hideTitleAddress}
			<TextInput
				name="title"
				label={$t('checkout.address.title.label')}
				placeholder={$t('checkout.address.title.placeholder')}
				value={information.title}
				on:input={(e) => onInput(e, information)}
			/>
		{/if}
		<TextInput
			name="address1"
			label={$t('checkout.address.address1.label')}
			placeholder={$t('checkout.address.address1.placeholder')}
			value={information.address1}
			on:input={(e) => onInput(e, information)}
			required
		/>
		<TextInput
			name="address2"
			label={$t('checkout.address.address2.label')}
			placeholder={$t('checkout.address.address2.placeholder')}
			value={information.address2}
			on:input={(e) => onInput(e, information)}
		/>
		<TextInput
			name="city"
			label={$t('checkout.address.city.label')}
			placeholder={$t('checkout.address.city.placeholder')}
			value={information.city}
			on:input={(e) => onInput(e, information)}
			required
		/>
		<TextInput
			name="zip"
			label={$t('checkout.address.zip.label')}
			placeholder={$t('checkout.address.zip.placeholder')}
			value={information.zip}
			on:input={(e) => onInput(e, information)}
			required
		/>
		<Search
			name="countries"
			label={$t('checkout.address.country.label')}
			placeholder={$t('checkout.address.country.placeholder')}
			defaultValue={information.country?.value}
			on:value={(e) => (information.country = e.detail)}
			items={Object.entries(countries).map(([key, value]) => ({ key, value }))}
			required
		/>
		<!-- <Search
            name="subdivisions"
            label={$t('checkout.address.subdivision.label')}
            placeholder={$t('checkout.address.subdivision.placeholder')}
            defaultValue={information.subdivision?.value}
            on:value={e => information.subdivision = e.detail}
            items={Object.entries(subdivisions).map(([key, value]) => ({key, value}))}
            required
        /> -->
		{#if !hideSubmitButton}
			<div class="flex justify-center grow pt-3 pb-2">
				<button
					disabled={loading || !isValid}
					type="submit"
					class="text-center w-1/2 px-6 py-3 border border-transparent rounded-md shadow-sm text-base font-medium text-white bg-indigo-600 hover:bg-indigo-700 disabled:opacity-75 disabled:bg-neutral-500 disabled:cursor-not-allowed"
				>
					{#if loading}
						{$t('common.update')}
					{:else if submitLabel}
						{submitLabel}
					{:else}
						{$t(`common.validate`)}
					{/if}
				</button>
			</div>
		{/if}
	</div>
</Form>

<style>
	* {
		box-sizing: border-box;
	}
</style>
