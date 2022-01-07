<script>
    import Moon from "svelte-loading-spinners/dist/ts/Moon.svelte";
    import ModalBox from "../box/ModalBox.svelte";

    export let topText, bottomText;
</script>

<style>
    /* your styles go here */
</style>

<ModalBox class="flex flex-col justify-center items-center">
    {#if topText}
        <span class="mb-4 font-medium text-lg">{topText}</span>    
    {/if}
    <Moon size="260" color="#FF3E00" unit="px" />
    {#if bottomText}
        <span class="mt-4 font-medium text-lg">{bottomText}</span>
    {/if}
</ModalBox>