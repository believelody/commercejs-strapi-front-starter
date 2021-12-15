<script>
    import {fly} from "svelte/transition";

    import { t } from "$lib/i18n";

    export let notification = {}, onRemove = null;

    const handleButtonClick = () => {
        onRemove();
    }

    const checkType = type => {
        switch (type) {
            case "success":
                return "border border-green-500 text-green-700";
            case "error":
                return "text-red-500";
            default:
                return "text-white";
        }
    }

    const checkPosition = position => {
        switch (position) {
            case "top-left":
                return "top-0 left-0 ml-3 mt-3";
            case "top-right":
                return "top-0 right-0 mt-3 mr-3";
            case "bottom-left":
                return "bottom-0 left-0 mb-3 ml-3";
            case "bottom-right":
            default:
                return "bottom-0 right-0 mb-3 mr-3";
        }
    }

    console.log(notification)
</script>

<div
    transition:fly
    on:click={() => handleButtonClick(notification.type)}
    class="z-9999 absolute bg-white cursor-pointer rounded w-screen-md shadow-sm {checkPosition(notification.position)} {checkType(notification.type)}"
>
    <h4 class="text-lg font-medium my-3 px-2 border-b border-gray-300">{notification.heading}</h4>
    <p class="mx-2">{notification.description}</p>
    <p class="my-2 p-2 text-right text-xs italic">{$t('common.notifications.note')}</p>
</div>