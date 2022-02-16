<script>
	export let size = 8,
		color = 'black',
		strokeWidth = 2;
</script>

<svg
	class="h-{size} w-{size} text-{color}"
	fill="none"
	viewBox="0 0 24 24" stroke="currentColor"
	stroke-width={strokeWidth}
>
	<path
		stroke-linecap="round"
		stroke-linejoin="round"
		stroke-width="2"
		d="M13 16h-1v-4h-1m1-4h.01M21 12a9 9 0 11-18 0 9 9 0 0118 0z"
	/>
</svg>

<style>
	/* your styles go here */
</style>
