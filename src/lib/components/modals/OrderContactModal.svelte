<script>
    import { getContext } from "svelte";
    import { getNotificationsContext } from "svelte-notifications";
    import { t } from "$lib/i18n";
    import api from "$lib/api";
    import { requiredFieldsValidation } from "../../utils/form.util";
    import ContactForm from "../forms/ContactForm.svelte";
    import WithActionModal from "../../elements/WithActionModal.svelte";

    export let reference, customer, orderId;
    let information = { email: customer.email }, loading = false, error;
    const { addNotifications } = getNotificationsContext()
    const { close } = getContext("simple-modal");

    function getInformation({ detail }) {
        information.subject = detail.subject;
        information.message = detail.message;
        if (detail.files) {
            information.files = detail.files;
        }
    }

    async function sendEmail() {
        loading = true;
        const res = await api.user.sendOrderEmail(information, orderId);
        if (res.success) {
            addNotifications({
                position: "bottom-left",
                heading: $t("notifications.order.email.heading"),
                text: $t("notifications.order.email.description"),
                description: $t("notifications.order.email.description"),
                type: "success",
                removeAfter: 5000
            });
            close();
        } else {
            error = res.error;
        }
        loading = false;
    }
    $: isValid = requiredFieldsValidation(information, ["subject", "message"])
</script>

<style>
    /* your styles go here */
</style>

<WithActionModal>
    <span class="text-neutral-dark" slot="header">{$t("order.modal.contact.title", { reference })}</span>
    <div slot="content">
        <h4 class="mx-2">
            <span class="text-neutral-dark">{$t("identity.title")} : </span>
            <span class="text-neutral-dark">{customer.firstname} {customer.lastname}</span>
        </h4>
        <h4 class="mx-2">
            <span class="text-neutral-dark">{$t("identity.email.label")} : </span>
            <span class="text-neutral-dark">{customer.email}</span>
        </h4>
        <ContactForm on:inputEvent={getInformation} withoutShadow hideSubmit />
    </div>
    <button disabled={!isValid || loading} slot="action" class="bg-indigo-500 px-6 py-2 rounded disabled:opacity-75 disabled:bg-gray-500 disabled:cursor-not-allowed">{$t("common.contact.send")}</button>
</WithActionModal>