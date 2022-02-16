<script>
    import { onDestroy } from "svelte";
    import { sidebar } from "$lib/stores";
    import CloseButton from "../../components/buttons/CloseButton.svelte";
    import { closeSidebar } from "../../context/sidebar";

    export let transparent = false;
    let className;
    export { className as class };

	onDestroy(() => {
		closeSidebar();
	});
</script>

<div class="w-screen md:max-w-lg h-screen bg-{transparent ? 'transparent' : 'white'} flex flex-col relative {className}">
    {#if !$sidebar?.noCloseBtn && !$$slots.header}
        <CloseButton
            on:click={closeSidebar}
            class="absolute top-0 right-0 bg-transparent"
    />
    {/if}
    <div class="relative">
        <slot name="header" />
        {#if !$sidebar?.noCloseBtn && $$slots.header}
            <CloseButton
			on:click={closeSidebar}
			class="absolute right-0 top-1/2 transform -translate-y-1/2 bg-transparent"
		/>
        {/if}
    </div>
    <slot name="content" />
    <slot name="extra" />
</div>