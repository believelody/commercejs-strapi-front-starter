<script>
	export let size = 8, color = "black", strokeWidth = 1;
</script>

<svg
	fill="none"
	stroke="currentColor"
	stroke-linecap="round"
	stroke-linejoin="round"
	stroke-width={strokeWidth}
	class="w-{size} h-{size} text-{color}"
	viewBox="0 0 24 24"
>
	<rect width="20" height="20" x="2" y="2" rx="5" ry="5" />
	<path d="M16 11.37A4 4 0 1112.63 8 4 4 0 0116 11.37zm1.5-4.87h.01" />
</svg>
