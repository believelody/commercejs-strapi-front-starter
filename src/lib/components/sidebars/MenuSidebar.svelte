<script>
    import { sidebar } from "$lib/stores";
	import Brand from '$lib/elements/brand/Brand.svelte';
    import Footer from '../footer/Footer.svelte';
	import ExtraLinks from '../links/ExtraLinks.svelte';
	import MenuNav from '../nav/MenuNav.svelte';
import CloseButton from '../buttons/CloseButton.svelte';
</script>

<div class="flex flex-col h-screen overflow-y-hidden">
	<h3 class="flex justify-around text-center text-lg py-4">
		<Brand />
		<CloseButton
			on:click={() => ($sidebar = null)}
			class="bg-transparent border border-neutral"
		/>
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
