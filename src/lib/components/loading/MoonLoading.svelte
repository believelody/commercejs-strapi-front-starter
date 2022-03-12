<script>
	import { Moon } from 'svelte-loading-spinners';
	import CenterSection from '$elements/center-section/CenterSection.svelte';

	export let size = "260", color="#FF3E00", unit = "px";
</script>

<CenterSection>
	<Moon {size} {color} {unit} />
</CenterSection>