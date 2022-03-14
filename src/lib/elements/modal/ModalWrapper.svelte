<script>
    import { onDestroy } from "svelte";
    import { modal } from "$lib/stores";
    import CloseButton from "$components/buttons/CloseButton.svelte";
    import { closeModal } from "./Modal.svelte";

    export let transparent = false;
    let className = "";
    export { className as class };

	onDestroy(() => {
		closeModal();
	});
</script>

<div class="py-2 px-4 max-w-lg rounded-lg bg-{transparent ? 'transparent' : 'white'} flex-center-middle {className} relative">
    {#if !$modal?.options?.noCloseButton}
        <CloseButton
            on:click={closeModal}
            class="absolute px-2 border rounded-full bg-white -top-4 -right-4"
    />
    {/if}
    <section class="flex flex-col relative">
        <slot />
    </section>
</div>