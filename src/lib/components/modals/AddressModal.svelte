<script>
    import { getContext } from "svelte";
    import { t } from '$lib/i18n';
    import AddressForm from "../forms/AddressForm.svelte";
    import Box from "$lib/elements/box/Box.svelte";
    import { openInfoModal } from "../../context/modal";

    export let title, information, type, action;
    const {open} = getContext("simple-modal");

    function closeModal() {
        openInfoModal(open, {
            title: $t(`notifications.address.heading.${type}`),
            description: $t(`notifications.address.description.${action}`),
            status: "success"
        });
    }
</script>

<Box>
    <AddressForm {title} withoutShadow {information} {type} {action} on:submitEvent={closeModal} />
    <button on:click={closeModal}>Close</button>
</Box>