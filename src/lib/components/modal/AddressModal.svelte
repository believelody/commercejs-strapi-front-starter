<script>
    import { getContext } from "svelte";
    import { t } from '$lib/i18n';
    import AddressForm from "../form/AddressForm.svelte";
    import ModalBox from "../box/ModalBox.svelte";
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

<ModalBox>
    <AddressForm {title} withoutShadow {information} {type} {action} on:submitEvent={closeModal} />
    <button on:click={closeModal}>Close</button>
</ModalBox>