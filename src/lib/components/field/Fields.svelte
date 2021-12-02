<script>
    export let withoutShadow = false;
</script>

<div class="mb-3 bg-white h-full {$$props.class} {withoutShadow ? "" : "shadow-xl"} rounded text-gray-600 flex-wrap flex">
    <slot />
</div>