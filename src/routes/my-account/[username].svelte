<script>
    import { onMount } from 'svelte';
    import { user, modal } from '$lib/stores';
    import api from '$lib/api';
    import ConfirmedEmailModal from '../../lib/components/modal/ConfirmationEmailModal.svelte';

    let promise;
    onMount(async () => {
        if ($user.confirmed) {
            promise = api.auth.getMe();
        } else {
            modal.set({
                show: ConfirmedEmailModal,
            });
            if (window) {
                window.history.back();
            }
        }
    });
    // $: promise = api.auth.getMe();
</script>

user = <pre>{JSON.stringify($user, null, 2)}</pre>
{#await promise then res}
    profile = <pre>{JSON.stringify(res, null, 2)}</pre>
{/await}
