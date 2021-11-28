<section class={$$props.class}>
    <slot />
</section>

<style>
	section {
		position: absolute;
		top: 50%;
		left: 50%;
		transform: translate3d(-50%, -50%, 0);
	}
</style>