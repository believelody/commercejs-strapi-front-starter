<script>
    import {getContext} from "svelte";
    import {t} from "$lib/i18n";
    import {profile} from "$lib/stores";
    import ImageModal from "../modal/ImageModal.svelte";
    import CloseIcon from "../svg/CloseIcon.svelte";

    export let name, image = "";
    let field, formElement;
    const {open} = getContext("simple-modal");

    function readFileBlob(result) {
            image = result;
    }

    function onInput() {
        const file = field.files[0];
        console.log("file: ", file);
        if (file) {
            const reader = new FileReader();
            reader.addEventListener("load", () => readFileBlob(reader.result));
            reader.readAsDataURL(file);
            reader.removeEventListener("load", () => readFileBlob(null));
        }
    }

    function showModal() {
        if (image) {
            open(ImageModal, {
                image,
                alt: $t("account.profile.image.alt", {name: `${$profile?.customer.firstname} ${$profile?.customer.lastname}`})
            });
        }
    }

    $: {
        if (image) {
        }
    }
</script>

<div on:click={showModal} class="{$$props.class} {image ? "cursor-pointer" : "flex items-center justify-center"} relative bg-contain bg-center bg-no-repeat relative" style="background-image: url({image});">
    {#if image}
        <span on:click={() => image = ""} class="absolute top-0 right-0 rounded-full bg-white">
            <CloseIcon />
        </span>
    {:else}
        <h4 class="text-lg">{$t("account.profile.image.no-image")}</h4>
    {/if}
    <form bind:this={formElement}>
        <input
            {name}
            type="file"
            bind:this={field}
            id={name}
            on:input={onInput}
            class="hidden"
        />
    </form>
</div>
<button on:click={() => field.click()} class="w-full border-none my-1 underline text-center text-xs text-gray-400 italic">{$t(`account.profile.image.btn.${image ? "change" : "add"}`)}</button>

<style>
    * {
        box-sizing: border-box;
    }
</style>