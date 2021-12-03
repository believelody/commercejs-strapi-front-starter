<script>
    import {getContext, onDestroy} from "svelte";
    import { page } from '$app/stores';
    import {goto} from '$app/navigation';
    import {jwt} from '$lib/stores';
    import LoginForm from '../form/LoginForm.svelte';
    import RegisterForm from '../form/RegisterForm.svelte';
    import ModalBox from "../box/ModalBox.svelte";

    let isLogin = true;
    const {close} = getContext("simple-modal");

    function closeModal() {
        if (jwt) {
            close();
        }
    }

    onDestroy(() => {
        goto("/my-account");
    })
</script>

<style>
    /* your styles go here */
</style>

<ModalBox>
	{#if isLogin}
        <LoginForm withoutShadow on:submitEvent={closeModal} on:toggleAuth={() => isLogin = false} />
    {:else}
        <RegisterForm withoutShadow on:submitEvent={closeModal} on:toggleAuth={() => isLogin = true} />
    {/if}
</ModalBox>