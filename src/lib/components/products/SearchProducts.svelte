<script>
    import { t } from "$lib/i18n";
    import InputField from "../field/InputField.svelte";
    import SearchIcon from "../svg/SearchIcon.svelte";

    let search = "";

    function openSearchBar() {
        
    }

    $: console.log(search);
</script>

<div class="hidden md:flex items-center lg:mx-2 flex-grow">
    <InputField
        search
        transparent
        on:input={({ target }) => search = target.value}
        placeholder={$t("product.search.placeholder")}
    />
</div>

<button class="md:hidden w-full flex justify-center items-center" on:click={openSearchBar}>
    <SearchIcon strokeWidth={2} />
</button>