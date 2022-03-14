<script>
	import IconButton from '$elements/button/IconButton.svelte';
	import SearchIcon from '$elements/icon/SearchIcon.svelte';

	let className = "";
	export { className as class };
</script>

<IconButton class={className} icon={SearchIcon} strokeWidth={2} on:click />

<style>
	/* your styles go here */
</style>
