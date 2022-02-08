<script>
	import { t } from "$lib/i18n";
    import { jwt, media } from "$lib/stores";
    import AuthHeaderButton from "../button/AuthHeaderButton.svelte";
    import UserCircleIcon from "../svg/UserCircleIcon.svelte";
</script>

{#if $jwt}
	<a
		href="/my-account"
		class="inline-flex items-center justify-center text-base md:px-2"
	>
		<UserCircleIcon size={$media.mobile ? 10 : 8} color={$media.tablet || $media.desktop ? "gray-600" : "black"} />
		<span class="hidden lg:inline">{$t('header.my-account')}</span>
	</a>
{:else}
	<AuthHeaderButton />
{/if}
