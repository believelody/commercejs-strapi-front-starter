<script>
	import HidePasswordIcon from "$elements/icon/HidePasswordIcon.svelte";
	import ShowPasswordIcon from "$elements/icon/ShowPasswordIcon.svelte";

	export let value = "", name = "", id = "", hint = "", error = "", label = "", placeholder = "", type = "text", required = false, icon = null, transparent = false, align = "horizontal";
	let showPwd = false, className = "";
	export { className as class };
</script>

<div class="{className} w-full">
	<label
		for={name}
		class="flex flex-{align === "vertical" ? 'col' : 'row'} items-center w-full"
	>
		{#if label}
			<span class="sm:text-right mr-2">
				{label}
				{#if required}
					*
				{/if}
			</span>
		{/if}
		<section class="border border-neutral rounded flex grow p-3">
			{#if icon}
				<svelte:component this={icon.component} {...icon.props} />
			{/if}
			<input
				value={value ?? ""}
				{name}
				type={showPwd ? "text" : type}
				id={id ?? name}
				on:input
				on:focus
				class="grow focus:outline-none bg-{transparent ? "transparent" : "white"}"
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
		<span class="text-xs italic">{hint}</span>
	{/if}
    {#if error}
        <span class="text-xs text-danger italic">{error}</span>
    {/if}
</div>

<style>
	* {
		box-sizing: border-box;
	}
</style>