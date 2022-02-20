<script>
	import { goto } from '$app/navigation';
	import { page } from "$app/stores";
	import { t } from '$lib/i18n';
    import { media } from "$lib/stores";
	import PrimaryButton from '../../elements/button/PrimaryButton.svelte';
	import Form from '../../elements/form/Form.svelte';
	import SearchIcon from '../../elements/icon/SearchIcon.svelte';
	import TextInput from '../../elements/input/TextInput.svelte';

	export let noIcon = false,
		transparent = false,
		withoutShadow = false;
	let className,
		search = $page.url.pathname === "/search" ? $page.url.searchParams.get("word") : "";
	export { className as class };

	$: isValid = !!search;
	function submit() {
		goto(`/search?word=${search}`);
	}
</script>

<Form class={className} on:submit={submit} {transparent} {withoutShadow}>
	<div class="p-4 grid grid-cols-1 gap-y-4" slot="content">
		<TextInput
			class="md:p-0 text-neutral-dark"
			icon={!noIcon
				? {
						component: SearchIcon,
						props: {
							class: 'mr-2',
							strokeWidth: 2
						}
				  }
				: null}
			on:input={({ target }) => (search = target.value)}
			value={search}
			placeholder={$t('product.search.form.placeholder')}
			hint={$media.mobile ? $t('product.search.form.hint') : ""}
		/>
		<div class="md:hidden">
			<PrimaryButton type="submit" block disabled={!isValid}>
				{$t('product.search.form.submit')}
			</PrimaryButton>
		</div>
	</div>
</Form>

<style>
	/* your styles go here */
</style>
