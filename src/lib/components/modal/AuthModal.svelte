<script>
    import {goto} from '$app/navigation';
    import {getContext} from "svelte";
    import {jwt} from '$lib/stores';
    import LoginForm from '../form/LoginForm.svelte';
    import RegisterForm from '../form/RegisterForm.svelte';
    import ModalBox from "../box/ModalBox.svelte";

    let isLogin = true;
    const {close} = getContext("simple-modal");

    function gotoMyAccount() {
        if (jwt) {
            goto(`/my-account`);
            close();
        }
    }
</script>

<style>
    /* your styles go here */
</style>

<ModalBox color="indigo-600">
	{#if isLogin}
        <LoginForm withoutShadow on:submitEvent={gotoMyAccount} on:toggleAuth={() => isLogin = false} />
    {:else}
        <RegisterForm withoutShadow on:submitEvent={gotoMyAccount} on:toggleAuth={() => isLogin = true} />
    {/if}
</ModalBox>