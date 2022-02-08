<script>
    import { t } from "$lib/i18n";
    import InputField from "../field/InputField.svelte";
    import SearchIcon from "../svg/SearchIcon.svelte";

    let search = "";

    function openSearchBar() {
        
    }
</script>

<div class="hidden md:flex md:items-center md:justify-center flex-grow">
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