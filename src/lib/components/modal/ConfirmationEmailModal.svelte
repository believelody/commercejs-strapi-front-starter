<script>
    import { goto } from '$app/navigation';
    import { t } from '$lib/i18n';
    import { user } from '$lib/stores';
    import ConfirmationEmailForm from "../form/ConfirmationEmailForm.svelte";
import CheckCircleIcon from '../svg/CheckCircleIcon.svelte';

    let success = false;

    function handleSubmitEvent({ detail }) {
        console.log(detail);
        if (detail.success) {
            success = detail.success
            $user.confirmed = true;
            goto(`/my-account/${$user.username}`);
        }
    }
</script>

<style>
    /* your styles go here */
</style>

<div class="bg-white px-4 pt-5 pb-4 sm:p-6 sm:pb-4">
    {#if success}
        <h3 class="text-lg text-gray-600 font-medium border-b pb-3 mb-3 flex items-center">
            <span class="bg-green-100 rounded-full p-1">
                <CheckCircleIcon />
            </span>
            <span class="ml-8">{$t(`auth.code.success.title`)}</span>
        </h3>
        {@html $t(`auth.code.success.text`)}
    {:else}
        <ConfirmationEmailForm withoutShadow on:submitEvent={handleSubmitEvent} />
    {/if}
</div>