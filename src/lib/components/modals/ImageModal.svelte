<script>
    import ModalWrapper from "$elements/modal/ModalWrapper.svelte";

    export let image, alt;
</script>

<ModalWrapper>
    <div class="flex-center-middle flex-grow">
        <img src={image} alt={alt || "image"} />
    </div>
</ModalWrapper>