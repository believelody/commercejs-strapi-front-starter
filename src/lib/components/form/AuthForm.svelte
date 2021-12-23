<script>
    import LoginForm from "./LoginForm.svelte";
    import RegisterForm from "./RegisterForm.svelte";

    let isLogin = false;
</script>

<style>
</style>

{#if isLogin}
    <LoginForm on:toggleAuth={() => isLogin = false} />
{:else}
    <RegisterForm on:toggleAuth={() => isLogin = true} />
{/if}