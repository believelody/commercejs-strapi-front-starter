<script>
    export let withoutShadow = false;
</script>

<fieldset class="mb-3 bg-white {withoutShadow ? "" : "shadow-xl"} rounded text-gray-600 flex-wrap flex">
    <slot />
</fieldset>