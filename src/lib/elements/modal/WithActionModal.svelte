<script>
    import { getContext } from 'svelte';
    import { t } from '$lib/i18n';
    import Box from '../box/Box.svelte';
import LinkButton from '../button/LinkButton.svelte';
    
    export let cancelText = $t("modal.cancel.text"), status;
	const { close } = getContext("simple-modal");

    function applyStatusStyle() {
        switch (status) {
            case "success":
                return "bg-success";
            case "danger":
                return "bg-danger";
            case "info":
                return "bg-info";
            case "warning":
                return "bg-warning";
            default:
                return "bg-transparent";
        }
    }
</script>

<style>
    /* your styles go here */
</style>

<Box>
	<div class="flex flex-col">
        <h3 class="flex items-center text-lg leading-6 font-medium text-gray-900" id="modal-title">
            {#if $$slots.icon}
                <div
                    class="mr-4 flex-shrink-0 flex-center-middle h-10 w-10 rounded-full {applyStatusStyle()}"
                >
                    <slot name="icon" />
                </div>
            {/if}
            <slot name="header" />
        </h3>
		<div class="mt-4 flex-grow">
			<slot name="content" />
		</div>
	</div>
    <div class="px-4 py-3 grid grid-cols-1 md:grid-cols-2 gap-2">
        <slot name="action" />
        <LinkButton
            on:click={close}
            class="w-full border"
        >
            {cancelText}
        </LinkButton>
    </div>
</Box>