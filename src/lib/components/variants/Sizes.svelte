<script>
    export let sizes, value;
</script>

<div class="flex items-center">
	<span class="mr-3">{sizes.name}</span>
	<div class="relative">
		<select
			bind:value
			class="rounded border appearance-none border-gray-300 py-2 focus:outline-none focus:ring-2 focus:ring-indigo-200 focus:border-indigo-500 text-base pl-3 pr-10"
		>
			{#each sizes.options as size}
				<option value={size}>{size.name}</option>
			{/each}
		</select>
		<span
			class="absolute right-0 top-0 h-full w-10 text-center text-gray-600 pointer-events-none flex items-center justify-center"
		>
			<svg
				fill="none"
				stroke="currentColor"
				stroke-linecap="round"
				stroke-linejoin="round"
				stroke-width="2"
				class="w-4 h-4"
				viewBox="0 0 24 24"
			>
				<path d="M6 9l6 6 6-6" />
			</svg>
		</span>
	</div>
</div>
