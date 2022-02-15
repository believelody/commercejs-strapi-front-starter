<script>
    import {t} from "$lib/i18n";
    import TextInput from "$lib/elements/input/TextInput.svelte";
    import SearchIcon from "$lib/elements/icon/SearchIcon.svelte";
import IconButton from "../../elements/button/IconButton.svelte";

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

<IconButton
    class="md:hidden bg-transparent"
    icon={SearchIcon}
    strokeWidth={2}
    on:click={openSearchBar}
/>