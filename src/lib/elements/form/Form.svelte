<script>
    import { createEventDispatcher } from "svelte";

    export let withoutShadow = false, transparent = false;
    const dispatch = createEventDispatcher();
</script>

<form on:submit|preventDefault={() => dispatch("submit")} {...$$restProps}>
    <slot name="header" />
    <div class="bg-{transparent ? 'transparent' : 'white'} {withoutShadow ? "" : "shadow-xl"} rounded grid grid-cols-1 gap-4 p-2">
        <slot name="content" />
    </div>
</form>