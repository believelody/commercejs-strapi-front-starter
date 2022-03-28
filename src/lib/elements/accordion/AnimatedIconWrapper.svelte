<script>
    export let duration, noAnimate, timing, isOpen, transitions, iconSize;
</script>

<div
	class="{iconSize ? `h-${iconSize}` : 'h-full'} transition-transform {noAnimate ? 'duration-[0ms]' : `duration-1000`} {timing} {isOpen ? transitions.end : transitions.start} transform-gpu"
>
	<slot />
</div>
