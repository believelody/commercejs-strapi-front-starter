<script>
	import { slide } from 'svelte/transition';
import AnimatedPlusCrossIcon from './AnimatedPlusCrossIcon.svelte';
import AnimatedPlusMinusIcon from './AnimatedPlusMinusIcon.svelte';
import AnimatedSpinningChevronIcon from './AnimatedSpinningChevronIcon.svelte';

	export let isOpen = false,
		animation = 'spinning-chevron',
		iconSize = 8,
		iconColor,
		noContentBorderTop = false,
		timing = '',
		duration = 700,
		noAnimate = false;

	function toggle() {
		isOpen = !isOpen;
	}

	function renderIconComponent() {
		switch (animation) {
			case 'plus-cross':
				return AnimatedPlusCrossIcon;
			case 'plus-minus':
				return AnimatedPlusMinusIcon;
			case 'spinning-chevron':
			default:
				return AnimatedSpinningChevronIcon;
		}
	}
</script>

<div class={$$props.class}>
	<button
		on:click={toggle}
		aria-expanded={isOpen}
		class="w-full flex items-center cursor-pointer py-2 bg-none"
	>
		<div class="overflow-hidden h-auto">
			<svelte:component this={renderIconComponent()} {isOpen} {duration} {timing} {iconSize} {iconColor} {noAnimate} />
		</div>
		<div class="w-full pr-4">
			<slot name="header" />
		</div>
	</button>

	{#if isOpen}
		<div class={!noContentBorderTop ? 'border-t-2' : ''} transition:slide={{ duration }}>
			<slot name="content" />
		</div>
	{/if}
</div>
