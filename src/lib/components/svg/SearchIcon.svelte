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
	<circle cx="11" cy="11" r="8" /> <line x1="21" y1="21" x2="16.65" y2="16.65" /></svg
>
