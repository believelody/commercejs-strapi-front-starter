<script>
	import { t } from '$lib/i18n';
	import { media } from "$lib/stores";
    import { localDateFromSeconds } from '$utils/date.util';
	import InvoiceOrder from '../print/InvoiceOrder.svelte';
	import FilePDFIcon from '$elements/icon/FilePDFIcon.svelte';
	import InfoButton from "$elements/button/InfoButton.svelte";

	export let data, onlyIcon = false;
	let printContent,
        loading = false,
		iconColor = "info";

	async function printInvoice() {
        try {
            loading = true;

            const options = {
                margin: 1,
                pagebreak: {
                    mode: ['css', 'legacy']
                },
                filename: `my-pet-lover-${data.customer_reference}-${localDateFromSeconds(data.created, true)}.pdf`,
                image: { type: 'jpeg', quality: 0.98 },
                html2canvas: { scale: 2, width: 600 },
                jsPDF: { unit: 'px', format: 'a4', orientation: 'p', hotfixes: ["px_scaling"] }
            };
            await html2pdf().set(options).from(printContent.innerHTML).save();
        } catch (error) {
            console.log(error);
        } finally {
            loading = false;
        }
	}

	function changeIconColorOnHoverBtn(color) {
		iconColor = color;
	}
</script>

<svelte:head>
	<script
		src="https://cdnjs.cloudflare.com/ajax/libs/html2pdf.js/0.10.1/html2pdf.bundle.min.js"
		integrity="sha512-GsLlZN/3F2ErC5ifS5QtgpiJtWd43JWSuIgh7mbzZ8zBps+dvLusV+eNQATqgA/HdeKFVgA5v3S/cIrLF7QnIg=="
		crossorigin="anonymous"
		referrerpolicy="no-referrer"></script>
</svelte:head>

<div class="hidden" bind:this={printContent}>
	<InvoiceOrder {data} />
</div>

<InfoButton
	outlined
	on:mouseenter={() => changeIconColorOnHoverBtn('white')}
	on:focus={() => changeIconColorOnHoverBtn('white')}
	on:mouseleave={() => changeIconColorOnHoverBtn('info')}
	on:blur={() => changeIconColorOnHoverBtn('info')}
	on:click={printInvoice}
    disabled={loading}
>
	<FilePDFIcon size={$media.mobile ? 4 : 8} color={iconColor} />
	{#if !onlyIcon}
		<span class="ml-2">{$t('order.account.table.body.button.bill')}</span>
	{/if}
</InfoButton>

<style></style>
