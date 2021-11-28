<script>
    import { goto } from '$app/navigation';
    import {getContext} from "svelte";
    import { jwt } from '$lib/stores';
    import LoginForm from '../form/LoginForm.svelte';
    import RegisterForm from '../form/RegisterForm.svelte';

    let isLogin = true;
    const { close } = getContext("simple-modal");

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

<div class="bg-indigo-500 px-4 pt-5 pb-4 sm:p-6 sm:pb-4">
	{#if isLogin}
        <LoginForm withoutShadow on:submitEvent={gotoMyAccount} on:toggleAuth={() => isLogin = false} />
    {:else}
        <RegisterForm withoutShadow on:submitEvent={gotoMyAccount} on:toggleAuth={() => isLogin = true} />
    {/if}
</div>