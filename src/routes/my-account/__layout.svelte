<script>
    import {getContext, onMount} from 'svelte';
    import api from '$lib/api'
    import {profile, user} from '$lib/stores';
    import PrivateRoute from '../../lib/components/private/PrivateRoute.svelte';
    import MenuProfile from '../../lib/components/profile/MenuProfile.svelte';
    import { openConfirmationEMailModal } from '../../lib/context/modal';

    const {open} = getContext("simple-modal");

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
                openConfirmationEMailModal(open);
                window.history.back();
            }
        }
    });
</script>

<div class="container flex h-full lg:justify-between mx-auto lg:mt-4">
    <aside class="sticky top-0 inset-x-0 hidden md:w-1/3 xl:w-1/4 h-full border shadow-lg rounded lg:flex lg:flex-col md:mr-2 xl:mr-6">
        <MenuProfile />
    </aside>
    <article class="relative bg-indigo-100 flex flex-col items-center h-full w-full md:w-2/3 xl:w-3/4 xl:ml-6 rounded lg:shadow-lg">
        <PrivateRoute>
            <slot />
        </PrivateRoute>
    </article>
</div>