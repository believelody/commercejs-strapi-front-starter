<script>
	import ChevronDownIcon from '../icon/ChevronDownIcon.svelte';
	import AnimatedIconWrapper from './AnimatedIconWrapper.svelte';

	export let iconSize, iconColor;
</script>

<AnimatedIconWrapper
	{...$$restProps}
	transitions={{ end: 'rotate-[90deg]', start: 'rotate-0' }}
>
	<ChevronDownIcon size={iconSize} color={iconColor} />
</AnimatedIconWrapper>
