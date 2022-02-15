<script>
	import { t } from '$lib/i18n';
    import { localDateFromSeconds } from '../../utils/date.util';
	import InvoiceOrder from '../print/InvoiceOrder.svelte';
	import FilePDFIcon from '$lib/elements/icon/FilePDFIcon.svelte';

	export let data;
	let printContent,
        loading = false,
		iconColor = 'blue-500';

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

<button
	on:mouseenter={() => changeIconColorOnHoverBtn('white')}
	on:focus={() => changeIconColorOnHoverBtn('white')}
	on:mouseleave={() => changeIconColorOnHoverBtn('blue-500')}
	on:blur={() => changeIconColorOnHoverBtn('blue-500')}
	on:click={printInvoice}
    disabled={loading}
	class="border border-blue-500 rounded px-4 flex items-center justify-center hover:bg-blue-500 hover:text-white disabled:bg-gray-500 disabled:opacity-75 disabled:cursor-not-allowed"
>
	<FilePDFIcon size={4} color={iconColor} />
	<span class="ml-2">{$t('order.account.table.body.button.bill')}</span>
</button>

<style></style>
