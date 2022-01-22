<script>
    import StarRating from "svelte-star-rating";

    export let nb;
    const style = `margin: 0;`;
</script>

<StarRating rating={nb} {style} config={{ showText: true }} />