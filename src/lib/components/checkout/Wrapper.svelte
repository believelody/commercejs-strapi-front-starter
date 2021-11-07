<script>
	import { setContext } from 'svelte';
import InformationPanel from './InformationPanel.svelte';
import OrderPanel from './OrderPanel.svelte';

	export let checkout;

    $: setContext('checkout', checkout);
</script>

<div class="flex relative">
	<InformationPanel />
	<OrderPanel />
</div>

<style>
	/* your styles go here */
</style>
