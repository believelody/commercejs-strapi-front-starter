<script>
    import {goto} from '$app/navigation';
    import {t} from '$lib/i18n';
    import api from '$lib/api';
    import ConfirmationEmailForm from "../form/ConfirmationEmailForm.svelte";
    import CheckCircleIcon from '../svg/CheckCircleIcon.svelte';
    import ModalBox from "../box/ModalBox.svelte";

    let success = false;

    async function handleSubmitEvent({detail}) {
        console.log(detail);
        if (detail.success) {
            success = detail.success
            await api.auth.getMe()
            goto(`/my-account`);
        }
    }
</script>

<style>
    /* your styles go here */
</style>

<ModalBox>
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
</ModalBox>