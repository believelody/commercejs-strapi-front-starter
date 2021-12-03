<script>
    import { getContext } from 'svelte';
    import {t} from '$lib/i18n';
    import api from '$lib/api';
    import ConfirmationEmailForm from "../form/ConfirmationEmailForm.svelte";
    import CheckCircleIcon from '../svg/CheckCircleIcon.svelte';
    import ModalBox from "../box/ModalBox.svelte";

    let success = false;
    const { close } = getContext("simple-modal");

    async function handleSubmitEvent({detail}) {
        if (detail.success) {
            success = detail.success;
            await api.auth.getMe();
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
        <h5 class="w-full text-center text-gray-500">{$t("common.or")}</h5>
        <div class="flex items-center text-gray-500 justify-center">
            <a on:click={() => close()} class="p-2 bg-indigo-300 text-black rounded" href="/my-account">{$t("auth.code.success.link")}</a>
        </div>
    {:else}
        <ConfirmationEmailForm withoutShadow on:submitEvent={handleSubmitEvent} />
    {/if}
</ModalBox>