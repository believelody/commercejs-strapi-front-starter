<script>
    import LoginForm from "./LoginForm.svelte";
    import RegisterForm from "./RegisterForm.svelte";

    let isLogin = true;
</script>

<style>
</style>

{#if isLogin}
    <LoginForm on:auth={e => isLogin = false} />
{:else}
    <RegisterForm on:auth={e => isLogin = true} />
{/if}