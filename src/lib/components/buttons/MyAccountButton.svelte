<script>
	import { goto } from "$app/navigation";
    import { t } from "$lib/i18n";
    import { media, sidebar } from "$lib/stores";
    import LinkButton from "../../elements/button/LinkButton.svelte";
    import UserCircleIcon from "../../elements/icon/UserCircleIcon.svelte";

	function onClick() {
		if ($media.mobile) {
			$sidebar = ProfileSidebar;
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
    <span class="hidden lg:inline">{$t('header.my-account')}</span>
</LinkButton>