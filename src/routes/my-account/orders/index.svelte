<script>
	import { onMount } from 'svelte';
	import { navigating, page } from '$app/stores';
	import api from '$lib/api';
	import { t } from '$lib/i18n';
	import { orders } from '$lib/stores';
	import HeaderTitle from '../../../lib/components/header/HeaderTitle.svelte';
	import MoonLoading from '../../../lib/components/loading/MoonLoading.svelte';
	import ReOrderButton from '../../../lib/components/buttons/ReOrderButton.svelte';
	import InvoicePDFViewerButton from '../../../lib/components/buttons/InvoicePDFViewerButton.svelte';
	import { localDateFromSeconds } from '../../../lib/utils/date.util';
	import PaginateComponent from '../../../lib/elements/pagination/PaginateComponent.svelte';

	let error = null,
		loading = false,
		pageSize = 6;

	async function getOrders() {
		loading = true;
		const res = await api.order.getAll();
		if (res.success) {
			$orders = res.orders;
		} else {
			error = res.error;
		}
		loading = false;
	}

	onMount(async () => {
		if (!$orders.length) {
			await getOrders();
		}
	});
</script>

{#if (loading || $navigating) && !$orders.length}
	<MoonLoading />
{:else}
	<HeaderTitle title={$t('order.account.title')} />
	{#if $orders.length}
		<PaginateComponent
			let:paginatedItems
            url={$page.url.href}
			items={$orders}
			{pageSize}
			currentPage={+$page.url.searchParams.get('page') || 1}
            class="flex flex-col"
		>
			<table class="border shadow-md rounded bg-white">
				<thead class="border-b">
					<tr>
						<th class="w-2/16">{$t('order.account.table.header.reference')}</th>
						<th class="w-4/16">{$t('order.account.table.header.date')}</th>
						<th class="w-2/16">{$t('order.account.table.header.price')}</th>
						<!-- <th class="w-4/16">{$t("order.account.table.header.shipping")}</th> -->
						<!-- <th class="w-4/16">{$t("order.account.table.header.tracking")}</th> -->
						<th class="w-3/16">{$t('order.account.table.header.fulfillment')}</th>
						<th>{$t('order.account.table.header.options')}</th>
					</tr>
				</thead>
				<tbody>
					{#each paginatedItems as item}
						<tr class="rounded my-2 border">
							<td class="border w-2/16">
								<span class="flex justify-center">{item.customer_reference.split('-')[1]}</span>
							</td>
							<td class="border w-4/16 px-1 text-center">
								{localDateFromSeconds(item.transactions[0].charge_date)}
							</td>
							<td class="border w-2/16 text-center">{item.order_value.formatted_with_symbol}</td>
							<!-- <td class="border w-4/16 px-1">
                                <section class="flex flex-col">
                                    <span>{item.shipping.street}</span>
                                    {#if item.shipping.street_2}
                                        <span>{item.shipping.street_2}</span>
                                    {/if}
                                    <span>{item.shipping.town_city} {item.shipping.postal_zip_code}</span>
                                    {#if item.shipping.county_state}
                                        <span>{order.shipping.county_state}</span>
                                    {/if}
                                    <span>{$t(`country.${order.shipping.country.toLowerCase()}`)}</span>
                                </section>
                            </td> -->
							<!-- <td></td> -->
							<td class="border w-3/16 text-center">{$t('order.account.table.body.not-fulfill')}</td>
							<td class="flex flex-col divide-y">
								<section class="flex-center-middle py-2">
									<ReOrderButton order={item.order} />
								</section>
								<section class="py-2 flex flex-col gap-y-2 items-center justify-center md:flex-row md:justify-around">
									<div class="">
										<a href={`orders/${item.customer_reference}`} class="underline font-medium">
											{$t('order.account.table.body.button.view')}
										</a>
									</div>
									<div class="">
										<InvoicePDFViewerButton data={item} />
									</div>
								</section>
							</td>
						</tr>
					{/each}
				</tbody>
			</table>
		</PaginateComponent>
	{:else}
		<div class="bg-white border rounded shadow-md h-full lg:w-4/5 flex flex-wrap">
			<section class="rounded p-6 my-2 mx-auto h-24 bg-indigo-200 flex flex-col justify-center">
				<span>{$t('order.empty.text')}</span>
				<a href="/" class="underline hover:text-blue-700">{$t('order.empty.link')}</a>
			</section>
		</div>
	{/if}
{/if}

<style>
	:global(.pagination-nav) {
		display: flex;
		justify-content: space-between;
	}
	:global(.number) {
		margin: 0 8px;
		cursor: pointer;
	}
	:global(.prev),
	:global(.next) {
		cursor: pointer;
	}
	:global(.active) {
		text-decoration: underline;
		font-weight: bold;
	}
</style>
