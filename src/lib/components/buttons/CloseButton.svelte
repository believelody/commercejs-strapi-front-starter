<script>
    import IconButton from "../../elements/button/IconButton.svelte";
	import CloseIcon from '../../elements/icon/CloseIcon.svelte';

	let className;
	export { className as class };
</script>

<style>
    /* your styles go here */
</style>

<IconButton
    on:click
    class={className}
    icon={CloseIcon}
    {...$$restProps}
/>