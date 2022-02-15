<script>
    export let block = false, shape = "rounded";
    let className, sizes = ["tiny", "small", "big", "large", "huge"], sizeStyle;

    export { className as class };

    function applySizeStyle(size) {
        let btnClass = [];
        if (block) {
            btnClass = [...btnClass, "w-full"];
        }
        switch (size) {
            case "tiny":
                btnClass = [...btnClass, "px-1", "py-0", "text-xs", "rounded"];
                break;
            case "small":
                btnClass = [...btnClass, "px-2", "py-1", "text-sm"];
                break;
            case "big":
                btnClass = [...btnClass, "px-8", "py-4", "text-xl", "rounded-lg"];
                break;
            case "large":
                btnClass = [...btnClass, "px-12", "py-6", "text-4xl", "rounded-lg"];
                break;
            case "huge":
                btnClass = [...btnClass, "px-16", "py-8", "text-8xl", "rounded-xl"];
                break;
            default:
                btnClass = [...btnClass, "px-4", "py-2", "text-md"];
                break;
        }
        return btnClass.join(" ");
    }

    $: {
        let founds = sizes.filter(size => $$props[size]);
        if (founds.length > 1) {
            console.error("Button component can only have one size option");
            sizeStyle = applySizeStyle();
        } else {
            sizeStyle = applySizeStyle(founds[0]);
        }
    }

    function applyShapeStyle(shape) {
        switch (shape) {
            case "circle":
                return "rounded-full";
            case "square":
                return "rounded-none";        
            case "rounded-sm":
                return "rounded-sm";        
            case "rounded-lg":
                return "rounded-lg";        
            case "rounded-xl":
                return "rounded-xl";        
            case "rounded":
            default:
                return "rounded";
        }
    }
</script>

<style>
    /* your styles go here */
</style>

<button on:click class="btn {applyShapeStyle(shape)} {className || ''} {sizeStyle}" {...$$restProps}>
    <slot />
</button>