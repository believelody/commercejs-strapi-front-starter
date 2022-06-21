<script>
	import MyAccountButton from '../buttons/MyAccountButton.svelte';
	import LoginButton from '../buttons/LoginButton.svelte';
	import { authenticated } from '$lib/stores';

	$: console.log("authenticated : ", $authenticated);
</script>

{#if $authenticated}
	<MyAccountButton />
{:else}
	<LoginButton />
{/if}
