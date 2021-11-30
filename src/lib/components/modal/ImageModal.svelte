<script>
    export let image, alt;

    $: console.log(image);
</script>

<div class="flex items-center justify-center flex-grow">
    <img src={image} alt={alt || "image"} />
</div>