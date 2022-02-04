<script>
	import HidePasswordIcon from "../svg/HidePasswordIcon.svelte";
	import ShowPasswordIcon from "../svg/ShowPasswordIcon.svelte";

	export let value, name, hint, error, label = "", placeholder, type = "text", required;
	let showPwd = false;
</script>

<div class="{$$props.class} w-full py-3 px-2">
	<label
			for={name}
			class="flex items-center w-full"
	>
		<span class="sm:text-right mr-2">
			{label}
			{#if required}
				*
			{/if}
		</span>
		<section class="border rounded flex grow p-3">
			<input
				value={value ?? ""}
				{name}
				type={showPwd ? "text" : type}
				id={name}
				on:input
				on:focus
				class="grow focus:outline-none"
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