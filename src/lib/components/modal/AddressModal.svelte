<script>
    import {getContext} from "svelte";
    import AddressForm from "../form/AddressForm.svelte";

    export let title, withoutShadow, information, type, submit;
    const { close } = getContext("simple-modal");

    function closeModal() {
        close();
    }

</script>

<AddressForm {title} {withoutShadow} {information} {type} {submit} on:submitEvent={closeModal} />