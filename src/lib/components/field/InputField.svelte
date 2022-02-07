<script>
	import HidePasswordIcon from "../svg/HidePasswordIcon.svelte";
	import ShowPasswordIcon from "../svg/ShowPasswordIcon.svelte";
	import SearchIcon from "../svg/SearchIcon.svelte";

	export let value, name, hint, error, label = "", placeholder, type = "text", required, search = false, transparent = false;
	let showPwd = false;
</script>

<div class="{$$props.class} w-full py-3 px-2">
	<label
			for={name}
			class="flex items-center w-full"
	>
		{#if label}
			<span class="sm:text-right mr-2">
				{label}
				{#if required}
					*
				{/if}
			</span>
		{/if}
		<section class="border rounded flex flex-grow p-3">
			{#if search}
				<SearchIcon class="mr-2" strokeWidth={2} />
			{/if}
			<input
				value={value ?? ""}
				{name}
				type={showPwd ? "text" : type}
				id={name}
				on:input
				on:focus
				class="flex-grow focus:outline-none bg-{transparent ? "transparent" : "white"}"
				{placeholder}
			/>
			{#if type === "password"}
				<span on:click={() => showPwd = !showPwd}>
					{#if !showPwd}
						<HidePasswordIcon />
					{:else}
						<ShowPasswordIcon color="blue-500" />
					{/if}
				</span>
			{/if}
		</section>
	</label>
	{#if hint}
		<span class="text-xs text-gray-400 italic">{hint}</span>
	{/if}
    {#if error}
        <span class="text-xs text-red-400 italic">{error}</span>
    {/if}
</div>

<style>
	* {
		box-sizing: border-box;
	}
</style>