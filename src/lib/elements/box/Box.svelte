<script>
    export let color = "white";
</script>

<div class="bg-{color} px-4 py-6 h-full {$$props.class}">
    <slot />
</div>