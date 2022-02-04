<script>
    export let image, alt;
</script>

<div class="flex items-center justify-center grow">
    <img src={image} alt={alt || "image"} />
</div>