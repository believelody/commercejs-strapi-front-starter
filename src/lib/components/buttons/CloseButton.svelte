<script>
    import IconButton from "../../elements/button/IconButton.svelte";
	import CloseIcon from '../../elements/icon/CloseIcon.svelte';
</script>

<style>
    /* your styles go here */
</style>

<IconButton
    on:click
    icon={CloseIcon}
    {...$$restProps}
/>