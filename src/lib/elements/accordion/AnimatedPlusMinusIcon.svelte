<script>
	import PlusIcon from '../icon/PlusIcon.svelte';
	import MinusIcon from '../icon/MinusIcon.svelte';
	import AnimatedIconWrapper from './AnimatedIconWrapper.svelte';

	export let iconSize, iconColor;
</script>

<AnimatedIconWrapper
	{...$$props}
	transitions={{ end: `-translate-y-${iconSize}`, start: `translate-y-0` }}
>
	<PlusIcon size={iconSize} color={iconColor} />
	<MinusIcon size={iconSize} color={iconColor} />
</AnimatedIconWrapper>
