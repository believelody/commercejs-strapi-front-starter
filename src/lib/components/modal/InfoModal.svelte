<script>
	import CheckCircleIcon from "../svg/CheckCircleIcon.svelte";
	import DangerIcon from "../svg/DangerIcon.svelte";

	export let title, description, status = "info";
</script>

<style>
	/* your styles go here */
</style>

<div class="bg-white px-4 pt-5 pb-4 sm:p-6 sm:pb-4">
	<div class="sm:flex sm:items-start">
		<div class="mt-3 text-center sm:mt-0 sm:ml-4 sm:text-left">
			<h3 class="flex items-center border-b border-gray-200 pb-2" id="modal-title">
				<span class="bg-{status === "success" ? "green" : status === "danger" ? "red" : "blue"}-100 rounded-full">
					{#if status === "success"}
						<CheckCircleIcon size={12} />
					{:else if status === "danger"}
						<DangerIcon size={12} />
					{/if}
				</span>
				<span class="ml-4 text-lg leading-6 font-medium text-gray-900">{title}</span>
			</h3>
			<div class="mt-2">
				<p class="text-md text-gray-600">
					{description}
				</p>
			</div>
		</div>
	</div>
</div>