<script>
	import { t } from '$lib/i18n';
    import { sidebar } from "$lib/stores";
	import Brand from '../brand/Brand.svelte';
    import Footer from '../footer/Footer.svelte';
	import Links from '../links/Links.svelte';
	import Nav from '../nav/Nav.svelte';
    import CloseIcon from '../svg/CloseIcon.svelte';
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
        <Nav />
		<Links />
    </div>
    <Footer />
</div>

<style>
	/* your styles go here */
</style>
