<script>
    export let shadow = "md", shape = "round", bgColor = "white";

    function classForShape() {
        switch (shape) {
            case "round":
                return "rounded";
            case "square":
                return "";
            default:
                return "rounded";
        }
    }
</script>

<style>
    /* your styles go here */
</style>

<div class="{classForShape()} bg-{bgColor} shadow-{shadow} {$$props.class}">
    <slot name="header" />
    <slot name="content" />
    <slot name="extra" />
</div>