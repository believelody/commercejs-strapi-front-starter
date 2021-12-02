<script>
	import CheckCircleIcon from "../svg/CheckCircleIcon.svelte";
	import DangerIcon from "../svg/DangerIcon.svelte";
	import ModalBox from "../box/ModalBox.svelte";

	export let title, description, status = "info";
</script>

<style>
	/* your styles go here */
</style>

<ModalBox>
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
</ModalBox>