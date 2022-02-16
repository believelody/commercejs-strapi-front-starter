<script>
    import { t } from '$lib/i18n';
    import AddressForm from "../forms/AddressForm.svelte";
    import ModalWrapper from "../../elements/modal/ModalWrapper.svelte";
    import Button from "../../elements/button/Button.svelte";
import { openModal } from '../../elements/modal/Modal.svelte';
import InfoModal from '../../elements/modal/InfoModal.svelte';

    export let title, information, type, action;

    function onSubmitEvent() {
        openModal({
            component: InfoModal,
            props: {
                title: $t(`notifications.address.heading.${type}`),
                description: $t(`notifications.address.description.${action}`),
                status: "success"
            }
        });
    }
</script>

<ModalWrapper>
    <AddressForm {title} withoutShadow {information} {type} {action} on:submitEvent={onSubmitEvent} />
</ModalWrapper>