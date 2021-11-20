<script>
	import { t } from '$lib/i18n';
	import InputField from '../field/InputField.svelte';

	export let data;

	function onInput(e) {
        console.log(e.target.name);
		data[e.target.name] = e.target.value;
	}

    function onInputTelephone(e) {
        if (e.data) {
            if ((e.target.value.length === 1 && e.data.match(/\d|\+/)) || e.target.value.match(/^\+{1}\d+$|^\d+$/g)) {
                console.log(e);
                data.telephone = e.target.value;
            } else {
                e.target.value = data.telephone ?? "";
            }
        }
    }

    function onBlur(e) {
    }
	$: console.log(data);
</script>

<fieldset class="mb-3 bg-white shadow-lg rounded text-gray-600">
	<div class="w-full flex flex-col xl:flex-row justify-between xl:border-b xl:border-gray-300">
		<InputField
			name="firstname"
			label={$t('identity.firstname.label')}
			placeholder={$t('identity.firstname.placeholder')}
			value={data.firstname}
			on:input={onInput}
            on:blur={onBlur}
			required
		/>
		<InputField
			name="lastname"
			label={$t('identity.lastname.label')}
			placeholder={$t('identity.lastname.placeholder')}
			value={data.lastname}
			on:input={onInput}
            on:blur={onBlur}
		/>
	</div>
	<div class="w-full flex flex-col xl:flex-row justify-between xl:border-b xl:border-gray-300">
		<InputField
			name="email"
			type="email"
			label={$t('identity.email.label')}
			placeholder={$t('identity.email.placeholder')}
			value={data.email}
			on:input={onInput}
            on:blur={onBlur}
			required
		/>
		<InputField
			name="telephone"
			label={$t('identity.telephone.label')}
			placeholder={$t('identity.telephone.placeholder')}
			value={data.telephone}
			on:input={onInputTelephone}
            on:blur={onBlur}
		/>
	</div>
</fieldset>