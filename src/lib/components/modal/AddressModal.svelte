<script>
    import AddressForm from "../form/AddressForm.svelte";

    export let title, withoutShadow;

    $: console.log(title)
</script>

<AddressForm {title} {withoutShadow} />