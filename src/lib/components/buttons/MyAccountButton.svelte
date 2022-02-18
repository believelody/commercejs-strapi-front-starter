<script>
    import { page } from "$app/stores";
	import { goto } from "$app/navigation";
    import { t } from "$lib/i18n";
    import { media } from "$lib/stores";
    import LinkButton from "../../elements/button/LinkButton.svelte";
    import UserCircleIcon from "../../elements/icon/UserCircleIcon.svelte";
    import { openSidebar } from "../../elements/sidebar/Sidebar.svelte";
    import ProfileSidebar from "../sidebars/ProfileSidebar.svelte";

    $: isActive = $page.url.pathname.includes("/my-account");

	function onClick() {
		if ($media.desktop) {
			goto("/my-account");
		} else {
			openSidebar({ component: ProfileSidebar });
		}
	}
</script>

<style>
    .active {
        @apply font-medium;
    }
</style>

<LinkButton underlinedOnHover on:click={onClick}>
    <UserCircleIcon strokeWidth={isActive ? 2 : 1} size={$media.mobile ? 10 : 8} color={$media.tablet || $media.desktop ? "gray-600" : "black"} />
    <span class:active={isActive} class="hidden lg:inline">{$t('header.my-account')}</span>
</LinkButton>