<script>
    import { t } from '$lib/i18n';
    import OrderAccordion from "../accordion/OrderAccordion.svelte";
import FullAddress from '../display/FullAddress.svelte';

    export let shipping, billing;
</script>

<style>
    /* your styles go here */
</style>

<OrderAccordion isOpen>
    <h3 slot="header" class="text-xl w-full pr-4">
        <span>{$t("order.detail.addresses.header")}</span>
    </h3>
    <div slot="content" class="flex flex-col lg:flex-row">
        <section class="block justify-center w-full lg:w-1/2">
            <h5>{$t("order.detail.addresses.content.shipping.label")}</h5>
            <FullAddress
                information={{
                    title: shipping.name,
                    address1: shipping.street,
                    address2: shipping.street2,
                    zip: shipping.postal_zip_code,
                    city: shipping.town_city,
                    country: {
                        key: shipping.country
                    }
                }}
            />
        </section>
        <section class="block justify-center w-full lg:w-1/2">
            <h5>{$t("order.detail.addresses.content.billing.label")}</h5>
            <FullAddress
                information={{
                    title: billing.name,
                    address1: billing.street,
                    address2: billing.street2,
                    zip: billing.postal_zip_code,
                    city: billing.town_city,
                    country: {
                        key: billing.country
                    }
                }}
            />
        </section>
    </div>
</OrderAccordion>