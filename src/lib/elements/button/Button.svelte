<script>
    export let size = "normal", block = false;
    let className;

    export { className as class };

    function applyStyle() {
        let btnClass = [];
        if (block) {
            btnClass = [...btnClass, "w-full"];
        }
        switch (size) {
            case "tiny":
                btnClass = [...btnClass, "px-1", "py-0", "text-xs"];
                break;
            case "small":
                btnClass = [...btnClass, "px-2", "py-1", "text-sm"];
                break;
            case "large":
                btnClass = [...btnClass, "px-16", "py-8", "text-lg"];
                break;
            case "huge":
                btnClass = [...btnClass, "px-32", "py-16", "text-xl"];
                break;        
            case "normal":
            default:
                btnClass = [...btnClass, "px-4", "py-2", "text-md"];
                break;
        }
        return btnClass.join(" ");
    }
</script>

<style>
    /* your styles go here */
</style>

<button on:click class="btn {className || ''} {applyStyle()}" {...$$restProps}>
    <slot />
</button>