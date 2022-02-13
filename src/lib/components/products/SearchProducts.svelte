<script>
    import { t } from "$lib/i18n";
    import TextInput from "../../elements/inputs/TextInput.svelte";
    import SearchIcon from "../../elements/icon/SearchIcon.svelte";

    let search = "";

    function openSearchBar() {
        
    }
</script>

<div class="hidden md:flex md:items-center md:justify-center flex-grow">
    <TextInput
        search
        transparent
        on:input={({ target }) => search = target.value}
        placeholder={$t("product.search.placeholder")}
    />
</div>

<button class="md:hidden w-full flex justify-center items-center" on:click={openSearchBar}>
    <SearchIcon strokeWidth={2} />
</button>