<script>
	import { fly } from 'svelte/transition';
	import CartNav from '../nav/CartNav.svelte';
	import MenuButton from '../buttons/MenuButton.svelte';
	import Logo from '$elements/logo/Logo.svelte';
	import AuthNav from '../nav/AuthNav.svelte';
	import SearchButton from '../buttons/SearchButton.svelte';
	import { openSidebar } from '$elements/sidebar/Sidebar.svelte';
	import SearchSidebar from '../sidebars/SearchSidebar.svelte';

	let toolbarHeight;

	function openSearchSidebar() {
		openSidebar({
			component: SearchSidebar,
			options: {
				openFrom: 'bottom',
                height: 'h-auto',
			}
		});
	}
</script>

<section bind:clientHeight={toolbarHeight}>
	<MenuButton />
	<SearchButton class="bg-transparent" on:click={openSearchSidebar} />
	<a href="/">
		<Logo />
	</a>
	<CartNav />
	<AuthNav />
</section>

<style>
	@import '../../../styles/tailwind-output.css';

	section {
		@apply bg-primary h-20 grid grid-cols-5 md:hidden justify-center h-20;
	}
</style>
