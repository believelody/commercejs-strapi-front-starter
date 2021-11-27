<script>
    import { onMount } from 'svelte';
    import { user, modal, profile } from '$lib/stores';
    import api from '$lib/api';
    import ConfirmedEmailModal from '../../lib/components/modal/ConfirmationEmailModal.svelte';

    onMount(async () => {
        if ($user.confirmed) {
            await api.auth.getMe();
        } else {
            modal.set({
                show: ConfirmedEmailModal,
            });
            if (window) {
                window.history.back();
            }
        }
    });
</script>

user = <pre>{JSON.stringify($user, null, 2)}</pre>
{#if $profile}
    profile = <pre>{JSON.stringify($profile, null, 2)}</pre>
{/if}