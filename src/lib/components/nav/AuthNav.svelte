<script>
	import { session } from '$app/stores';
	import MyAccountButton from '../buttons/MyAccountButton.svelte';
	import LoginButton from '../buttons/LoginButton.svelte';
</script>

{#if $session.authenticated}
	<MyAccountButton />
{:else}
	<LoginButton />
{/if}
