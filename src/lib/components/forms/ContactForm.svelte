<script>
    import { t } from '$lib/i18n';
    import { createEventDispatcher } from 'svelte';
import Form from '$lib/elements/form/Form.svelte';
    import Fields from "$lib/elements/form/Form.svelte";
    import Select from "../field/Select.svelte";
    import Textarea from "../field/Textarea.svelte";

    export let withoutShadow, hideSubmit, withAttachments = false;
    let selectObject, message = "", files;
    let objects = [
        $t("common.contact.object.list.claim"),
        $t("common.contact.object.list.problem"),
        $t("common.contact.object.list.ask"),
        $t("common.contact.object.list.damaged"),
        $t("common.contact.object.list.no-delivery"),
        $t("common.contact.object.list.not-right-item"),
    ];
    const dispatch = createEventDispatcher();

    $: {
        if (hideSubmit) {
            dispatch("inputEvent", { subject: selectObject, message: message, files });
        }
    };
</script>

<style>
    /* your styles go here */
</style>

<Form {withoutShadow}>
    <svelte:fragment slot="content">
        <Select
            label={`${$t("common.contact.object.label")} : `}
            name="selectObject"
            bind:value={selectObject}
            class="w-full px-2"
        >
            {#each objects as item}
                <option value={item}>{item}</option>
            {/each}
        </Select>
        <Textarea
            label={$t("common.contact.message.label")}
            name="message"
            class="w-full px-2"
            placeholder={$t("common.contact.message.placeholder")}
            bind:value={message}
            required
        />
        {#if !hideSubmit}
            <div class="w-auto my-2 xl:mx-4 flex flex-col xl:flex-row justify-center items-center">
                <button type="submit" class="bg-indigo-600 hover:bg-indigo-700 px-6 py-2 rounded">{$t("common.contact.send")}</button>
            </div>
        {/if}
    </svelte:fragment>
</Form>