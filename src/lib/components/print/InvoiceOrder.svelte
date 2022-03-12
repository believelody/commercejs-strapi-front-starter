<script>
    import { t } from '$lib/i18n';
    import FullAddress from "../addresses/FullAddress.svelte";
    import { localDateFromSeconds } from '$utils/date.util';

    export let data;
</script>

<style>
    @page {
        size: A4 portrait;
        counter-increment: page;
    }
</style>

<div class="px-4" style="width: 600px;">
    <div class="mb-8 flex justify-between">
        <div>
            <h2 class="text-3xl font-bold mb-6 pb-2 tracking-wider uppercase">{$t("order.invoice.header")}</h2>

            <div class="mb-1 flex items-center">
                <span class="w-32 text-gray-800 block font-bold text-xs uppercase tracking-wide">{$t("order.invoice.number")}</span>
                <span class="mr-4 inline-block">:</span>
                <span>{data.customer_reference}</span>
            </div>

            <div class="mb-1 flex items-center">
                <span class="w-32 text-gray-800 block font-bold text-xs uppercase tracking-wide">{$t("order.invoice.date")}</span>
                <span class="mr-4 inline-block">:</span>
                <span>{localDateFromSeconds(data.created)}</span>
            </div>
        </div>
        <div class="pr-5">
            <div class="w-32 h-32 mb-1 overflow-hidden">
                <!-- <img id="image2" class="object-cover w-20 h-20" /> -->
            </div>
        </div>
    </div>

    <div class="flex justify-between mb-10">
        <div class="w-1/2">
            <span class="text-gray-800 block mb-2 font-bold text-xs uppercase tracking-wide">{$t("order.invoice.shipping")}:</span>
            <FullAddress information={{
                title: data.shipping.name,
                address1: data.shipping.street,
                address2: data.shipping.street2,
                zip: data.shipping.postal_zip_code,
                city: data.shipping.town_city,
                country: {
                    key: data.shipping.country
                }
            }} />
        </div>
        <div class="w-1/2">
            <span class="text-gray-800 block mb-2 font-bold text-xs uppercase tracking-wide">{$t("order.invoice.billing")}:</span>
            <FullAddress information={{
                title: data.billing.name,
                address1: data.billing.street,
                address2: data.billing.street2,
                zip: data.billing.postal_zip_code,
                city: data.billing.town_city,
                country: {
                    key: data.billing.country
                }
            }} />
        </div>
        <!-- <div class="w-1/2">
            <span class="text-gray-800 block mb-2 font-bold text-xs uppercase tracking-wide">From:</span>
            <div>
                <div x-text="from.name"></div>
                <div x-text="from.address"></div>
                <div x-text="from.extra"></div>
            </div>
        </div> -->
    </div>

    <div class="flex flex-wrap -mx-1 border-b py-2 items-start">
        <div class="flex-1 px-1">
            <p class="text-neutral-dark uppercase tracking-wide text-xs font-bold">{$t("order.invoice.description")}</p>
        </div>

        <div class="px-1 w-32 text-right">
            <p class="text-neutral-dark uppercase tracking-wide text-xs font-bold">{$t("order.invoice.units")}</p>
        </div>

        <div class="px-1 w-32 text-right">
            <p class="leading-none">
                <span class="block uppercase tracking-wide text-xs font-bold text-neutral-dark">{$t("order.invoice.price")}</span>
                <span class="font-medium text-xs text-gray-500">{$t("order.invoice.tax")}</span>
            </p>
        </div>

        <div class="px-1 w-32 text-right">
            <p class="leading-none">
                <span class="block uppercase tracking-wide text-xs font-bold text-neutral-dark">{$t("order.invoice.item-total")}</span>
                <span class="font-medium text-xs text-gray-500">{$t("order.invoice.tax")}</span>
            </p>
        </div>
    </div>
    <ul>
        {#each data.order.line_items as item}
            <li>
                <div class="flex flex-wrap -mx-1 py-2 border-b">
                    <div class="flex-1 px-1">
                        <p class="text-gray-800">{item.name}</p>
                        <p class="text-sm text-neutral-dark">
                            {#each item.variants as variant}
                                <span>{variant.variant_name} :</span>
                                <span class="font_medium mr-4">{variant.option_name}</span>
                            {/each}
                        </p>
                    </div>

                    <div class="px-1 w-32 text-right">
                        <p class="text-gray-800">{item.quantity}</p>
                    </div>

                    <div class="px-1 w-32 text-right">
                        <p class="text-gray-800">{item.price.formatted_with_symbol}</p>
                    </div>

                    <div class="px-1 w-32 text-right">
                        <p class="text-gray-800">{item.line_total_with_tax.formatted_with_symbol}</p>
                    </div>
                </div>
            </li>
        {/each}
    </ul>

    <div class="py-2 ml-auto mt-20" style="width: 320px">
        <div class="flex justify-between mb-3">
            <div class="text-gray-800 text-right flex-1">{$t("order.invoice.items-total")}</div>
            <div class="text-right w-40">
                <div class="text-gray-800 font-medium">{data.order.subtotal.formatted_with_symbol}</div>
            </div>
        </div>
        <div class="flex justify-between mb-4">
            <div class="text-sm text-neutral-dark text-right flex-1">{$t("order.invoice.shipping-method")}</div>
            <div class="text-right w-40">
                <div class="text-sm text-neutral-dark">{data.order.shipping.description}</div>
            </div>
        </div>
        <div class="flex justify-between mb-4">
            <div class="text-sm text-neutral-dark text-right flex-1">{$t("order.invoice.price")}</div>
            <div class="text-right w-40">
                <div class="text-sm text-neutral-dark">{data.order.shipping.price.formatted_with_symbol}</div>
            </div>
        </div>
    
        <div class="py-2 border-t border-b">
            <div class="flex justify-between">
                <div class="text-xl text-neutral-dark text-right flex-1">{$t("order.invoice.total")}</div>
                <div class="text-right w-40">
                    <div class="text-xl text-gray-800 font-bold">{data.order.total_with_tax.formatted_with_symbol}</div>
                </div>
            </div>
        </div>
    </div>
</div>