<script>
	import HidePasswordIcon from "../svg/HidePasswordIcon.svelte";
	import ShowPasswordIcon from "../svg/ShowPasswordIcon.svelte";


	export let value, name, hint, label = "", placeholder, type = "text", required;
	let showPwd = false;
</script>

<div class="flex flex-col items-center py-3 px-2 border-b border-gray-300 xl:border-none">
	<label
			for={name}
			class="flex items-center w-full"
	>
		<span class="sm:text-right xl:mr-2">
			{label}
			{#if required}
				*
			{/if}
		</span>
		<input
				value={value ?? ""}
				{name}
				type={showPwd ? "text" : type}
				id={name}
				on:input
				on:focus
				class="flex-grow focus:outline-none px-3 xl:px-0"
				{placeholder}
		/>
		{#if type === "password"}
			<span on:click={() => showPwd = !showPwd}>
				{#if showPwd}
					<HidePasswordIcon color="blue-500" />
				{:else}
					<ShowPasswordIcon />
				{/if}
			</span>
		{/if}
	</label>
	{#if hint}
		<span class="text-xs text-gray-400 italic">{hint}</span>
	{/if}
</div>

<style>
	* {
		box-sizing: border-box;
	}
</style>