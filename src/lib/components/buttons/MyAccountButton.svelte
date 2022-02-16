<script>
	import { goto } from "$app/navigation";
    import { t } from "$lib/i18n";
    import { media } from "$lib/stores";
    import { openSidebar } from "../../context/sidebar";
    import LinkButton from "../../elements/button/LinkButton.svelte";
    import UserCircleIcon from "../../elements/icon/UserCircleIcon.svelte";
    import ProfileSidebar from "../sidebars/ProfileSidebar.svelte";

	function onClick() {
		if ($media.mobile) {
			openSidebar({ component: ProfileSidebar });
		} else {
			goto("/my-account");
		}
	}
</script>

<style>
    /* your styles go here */
</style>

<LinkButton underlinedOnHover on:click={onClick}>
    <UserCircleIcon size={$media.mobile ? 10 : 8} color={$media.tablet || $media.desktop ? "gray-600" : "black"} />
    <span class="hidden lg:inline font-medium">{$t('header.my-account')}</span>
</LinkButton>