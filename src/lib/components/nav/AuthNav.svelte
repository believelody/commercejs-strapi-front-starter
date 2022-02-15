<script>
    import { jwt } from "$lib/stores";
	import MyAccountButton from "../buttons/MyAccountButton.svelte";
    import LoginButton from "../buttons/LoginButton.svelte";
</script>

{#if $jwt}
	<MyAccountButton />
{:else}
	<LoginButton />
{/if}
