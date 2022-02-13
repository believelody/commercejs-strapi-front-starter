<script>
    export let submit, withoutShadow = false;
</script>

<form on:submit|preventDefault={submit} {...$$restProps}>
    <slot name="header" />
    <div class="bg-white {withoutShadow ? "" : "shadow-xl"} rounded grid grid-cols-1 gap-4">
        <slot name="content" />
    </div>
</form>