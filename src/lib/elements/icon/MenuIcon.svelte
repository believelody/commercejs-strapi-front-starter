<script>
	export let size = 8, color = "black", strokeWidth = 1;
</script>

<svg
	class="h-{size} w-{size} text-{color} {$$props.class}"
	viewBox="0 0 24 24"
	fill="none"
	stroke="currentColor"
	stroke-width={strokeWidth}
	stroke-linecap="round"
	stroke-linejoin="round"
>
	<line x1="3" y1="12" x2="21" y2="12" /> <line x1="3" y1="6" x2="21" y2="6" />
	<line x1="3" y1="18" x2="21" y2="18" /></svg
>
