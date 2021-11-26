<script>
    import LoginForm from "./LoginForm.svelte";
    import RegisterForm from "./RegisterForm.svelte";

    let isLogin = false;
</script>

<style>
</style>

{#if isLogin}
    <LoginForm on:loginEvent on:toggleAuth={() => isLogin = false} />
{:else}
    <RegisterForm on:registerEvent on:toggleAuth={() => isLogin = true} />
{/if}