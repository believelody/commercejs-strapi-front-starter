<script>
	import CheckCircleIcon from '$lib/elements/icon/CheckCircleIcon.svelte';
	import DangerIcon from '$lib/elements/icon/DangerIcon.svelte';
	import InfoCircleIcon from '$lib/elements/icon/InfoCircleIcon.svelte';
	import ModalWrapper from './ModalWrapper.svelte';

	export let title,
		description,
		status,
		iconBgShade,
		noIcon = false;

	function applyStatusStyle() {
		let bgColor = '';
		switch (status) {
			case 'success':
				bgColor = 'bg-success';
				break;
			case 'danger':
				bgColor = 'bg-danger';
				break;
			case 'info':
				bgColor = 'bg-info';
				break;
			case 'warning':
				bgColor = 'bg-warning';
				break;
			default:
				bgColor = 'bg-transparent';
				break;
		}
		if (status) {
			if (iconBgShade === 'light') {
				bgColor += '-light-1';
			} else if (iconBgShade === 'dark') {
				bgColor += '-dark-1';
			}
		}
		return bgColor;
	}
</script>

<ModalWrapper>
	<h3
		class="grid grid-cols-2 items-center gap-x-4 border-b border-gray-200 pb-2 w-full"
		id="modal-title"
	>
		{#if !noIcon}
			<span class="{applyStatusStyle()} rounded-full">
				{#if status === 'success'}
					<CheckCircleIcon size={12} color="success" />
				{:else if status === 'danger'}
					<DangerIcon size={12} color="danger" />
				{:else if status === 'warning'}
					<DangerIcon size={12} color="warning" />
				{:else if status === 'info'}
					<InfoCircleIcon size={12} color="info" />
				{:else if $$slots.icon}
					<slot name="icon" />
				{/if}
			</span>
		{/if}
		<span class="ml-4 leading-6 font-medium text-gray-900">{title}</span>
	</h3>
	<p class="mt-2 text-md text-neutral-dark">
		{description}
	</p>
</ModalWrapper>

<style>
	/* your styles go here */
</style>
