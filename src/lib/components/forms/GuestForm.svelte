<script>
	import { t } from '$lib/i18n';
	import { guest } from '$lib/stores';
	import TextInput from '../../elements/inputs/TextInput.svelte';

	let data = {};

	function onInput(e) {
		data[e.target.name] = e.target.value;
	}

    function onInputTelephone(e) {
        if (e.data) {
            if ((e.target.value.length === 1 && e.data.match(/\d|\+/)) || e.target.value.match(/^\+{1}\d+$|^\d+$/g)) {
                data.telephone = e.target.value;
            } else {
                e.target.value = data.telephone ?? "";
            }
        }
    }
	$: $guest = data;
</script>

<fieldset class="mb-3 bg-white shadow-lg rounded text-neutral-dark">
	<div class="w-full flex flex-col xl:flex-row justify-between xl:border-b xl:border-gray-300">
		<TextInput
			name="firstname"
			label={$t('identity.firstname.label')}
			placeholder={$t('identity.firstname.placeholder')}
			value={data.firstname}
			on:input={onInput}
			required
		/>
		<TextInput
			name="lastname"
			label={$t('identity.lastname.label')}
			placeholder={$t('identity.lastname.placeholder')}
			value={data.lastname}
			on:input={onInput}
		/>
	</div>
	<div class="w-full flex flex-col xl:flex-row justify-between xl:border-b xl:border-gray-300">
		<TextInput
			name="email"
			type="email"
			label={$t('identity.email.label')}
			placeholder={$t('identity.email.placeholder')}
			value={data.email}
			on:input={onInput}
			required
		/>
		<TextInput
			name="telephone"
			type="tel"
			label={$t('identity.telephone.label')}
			placeholder={$t('identity.telephone.placeholder')}
			value={data.telephone}
			on:input={onInputTelephone}
		/>
	</div>
</fieldset>