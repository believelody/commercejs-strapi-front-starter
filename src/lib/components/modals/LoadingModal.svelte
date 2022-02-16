<script>
    import Moon from "svelte-loading-spinners/dist/ts/Moon.svelte";
import ModalWrapper from "../../elements/modal/ModalWrapper.svelte";

    export let topText, bottomText;
</script>

<style>
    /* your styles go here */
</style>

<ModalWrapper>
    {#if topText}
        <span class="mb-4 font-medium text-lg">{topText}</span>    
    {/if}
    <Moon size="260" color="#FF3E00" unit="px" />
    {#if bottomText}
        <span class="mt-4 font-medium text-lg">{bottomText}</span>
    {/if}
</ModalWrapper>