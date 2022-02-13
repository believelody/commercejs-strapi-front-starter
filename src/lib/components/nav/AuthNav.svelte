<script>
	import { goto } from "$app/navigation";
	import { t } from "$lib/i18n";
    import { jwt, media, sidebar } from "$lib/stores";
    import AuthHeaderButton from "../buttons/AuthHeaderButton.svelte";
    import UserCircleIcon from "../../elements/icon/UserCircleIcon.svelte";
	import ProfileSidebar from "../sidebars/ProfileSidebar.svelte";

	function onClick() {
		if ($media.mobile) {
			$sidebar = ProfileSidebar;
		} else {
			goto("/my-account");
		}
	}
</script>

{#if $jwt}
	<button on:click={onClick} class="inline-flex items-center justify-center text-base md:px-2">
		<UserCircleIcon size={$media.mobile ? 10 : 8} color={$media.tablet || $media.desktop ? "gray-600" : "black"} />
		<span class="hidden lg:inline">{$t('header.my-account')}</span>
	</button>
{:else}
	<AuthHeaderButton />
{/if}
