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

<div class="relative container mx-auto grid grid-rows-1 gap-4 lg:mt-4">
    <aside class="hidden lg:flex lg:flex-col">
        <div class="sticky top-0 inset-x-0 border shadow-lg rounded">
            <MenuProfile />
        </div>
    </aside>
    <article class="relative bg-primary-light-2 lg:col-start-2 lg:col-span-3 flex flex-col items-center h-full rounded lg:shadow-lg">
        <PrivateRoute>
            <slot />
        </PrivateRoute>
    </article>
</div>