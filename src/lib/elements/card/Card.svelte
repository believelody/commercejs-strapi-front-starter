<script>
    export let shadow = "md", shape = "round", bgColor = "white";
    let className = "";
    export { className as class };

    function classForShape() {
        switch (shape) {
            case "square":
                return "";
            case "rounded-lg":
                return "rounded-lg";
            case "rounded-xl":
                return "rounded-xl";
            case "round":
            default:
                return "rounded";
        }
    }
</script>

<style>
    /* your styles go here */
</style>

<div class="flex flex-col {classForShape()} bg-{bgColor} shadow-{shadow} {$$props.class}">
    <slot name="header" />
    <slot name="content" />
    <slot name="extra" />
</div>