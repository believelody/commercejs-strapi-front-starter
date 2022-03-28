<script>    
	export let size = 8,
		color = 'black',
		strokeWidth = 2;
</script>

<svg
	class="h-{size} w-{size} text-{color}"
	viewBox="0 0 24 24"
	fill="none"
	stroke="currentColor"
	stroke-width="{strokeWidth}"
	stroke-linecap="round"
	stroke-linejoin="round"
>
	<slot />
</svg>
