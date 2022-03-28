<script>
	import PlusIcon from '../icon/PlusIcon.svelte';
	import AnimatedIconWrapper from './AnimatedIconWrapper.svelte';

	export let iconSize, iconColor;
</script>

<AnimatedIconWrapper
	{...$$restProps}
	transitions={{ end: 'rotate-[225deg]', start: 'rotate-0' }}
>
	<PlusIcon size={iconSize} color={iconColor} />
</AnimatedIconWrapper>
