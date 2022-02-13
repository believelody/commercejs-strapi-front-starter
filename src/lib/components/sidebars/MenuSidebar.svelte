<script>
	import { t } from '$lib/i18n';
    import { sidebar } from "$lib/stores";
	import Brand from '../../elements/brand/Brand.svelte';
    import Footer from '../footer/Footer.svelte';
	import ExtraLinks from '../links/ExtraLinks.svelte';
	import MenuNav from '../nav/MenuNav.svelte';
    import CloseIcon from '../../elements/icon/CloseIcon.svelte';
</script>

<div class="flex flex-col h-screen overflow-y-hidden">
	<h3 class="flex justify-around text-center text-lg py-4">
		<Brand />
		<button
			on:click={() => ($sidebar = null)}
			class="border rounded p-1 text-gray-400 hover:text-gray-500"
		>
			<span class="sr-only">{$t('modal.close')}</span>
			<!-- Heroicon name: outline/x -->
			<CloseIcon />
		</button>
	</h3>
	<div class="flex-grow text-gray-700 overflow-y-auto border-t">
        <MenuNav />
		<ExtraLinks />
    </div>
    <Footer />
</div>

<style>
	/* your styles go here */
</style>
