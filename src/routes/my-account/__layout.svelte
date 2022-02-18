<script>
	import { onMount } from 'svelte';
	import api from '$lib/api';
	import { profile, user } from '$lib/stores';
	import PrivateRoute from '../../lib/components/private/PrivateRoute.svelte';
	import MenuProfile from '../../lib/components/profile/MenuProfile.svelte';
	import ConfirmationEmailModal from '../../lib/components/modals/ConfirmationEmailModal.svelte';
	import { openModal } from '../../lib/elements/modal/Modal.svelte';

	onMount(async () => {
		if ($user.confirmed) {
			if (!$profile) {
				await api.auth.getMe();
			}
			if (!$profile?.addresses) {
				await api.address.getAll();
			}
		} else {
			if (window) {
				openModal(ConfirmationEmailModal);
				window.history.back();
			}
		}
	});
</script>

<div class="layout">
	<aside>
		<div class="aside-profile">
			<MenuProfile />
		</div>
	</aside>
	<article>
		<PrivateRoute>
			<slot />
		</PrivateRoute>
	</article>
</div>

<style>
	@import "../../styles/tailwind.css";

	.layout {
		@apply relative container mx-auto grid grid-rows-1 gap-4 flex-grow lg:flex-grow-0 lg:mt-4;
	}

	aside {
		@apply hidden relative lg:flex lg:flex-col lg:col-span-1 xl:col-span-3;
	}

	.aside-profile {
		@apply sticky top-0 inset-x-0 border shadow-lg rounded;
	}

	article {
		@apply relative bg-primary-light-2 lg:col-start-2 lg:col-span-2 xl:col-start-4 flex flex-col items-center rounded lg:shadow-lg pb-0 lg:pb-4;
	}
</style>