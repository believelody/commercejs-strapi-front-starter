<script>
    import { getContext } from 'svelte';
    import { t } from '$lib/i18n';
    import Box from '../box/Box.svelte';
    
    export let cancelText = $t("modal.cancel.text");
	const { close } = getContext("simple-modal");
</script>

<style>
    /* your styles go here */
</style>

<Box>
	<div class="flex flex-col">
        <h3 class="flex items-center text-lg leading-6 font-medium text-gray-900" id="modal-title">
            {#if $$slots.icon}
                <div
                    class="mr-4 flex-shrink-0 flex items-center justify-center h-10 w-10 rounded-full bg-green-100"
                >
                    <!-- Heroicon name: outline/exclamation -->
                    <slot name="icon" />
                </div>
            {/if}
            <slot name="header" />
        </h3>
		<div class="mt-4 flex-grow">
			<slot name="content" />
		</div>
	</div>
    <div class="bg-gray-50 px-4 py-3 sm:px-6 sm:flex sm:flex-row-reverse">
        <slot name="action" />
        <button
            type="button"
            on:click={close}
            class="mt-3 lg:mt-0 lg:mr-4 w-full inline-flex justify-center rounded-md border border-gray-300 shadow-sm px-4 py-2 bg-white text-base font-medium text-gray-700 hover:bg-gray-50 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-indigo-500 sm:mt-0 sm:ml-3 sm:w-auto sm:text-sm"
        >
            {cancelText}
        </button>
    </div>
</Box>