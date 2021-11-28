<script>
    import { user, profile } from '$lib/stores';
</script>

user = <pre>{JSON.stringify($user, null, 2)}</pre>
{#if $profile}
    profile = <pre>{JSON.stringify($profile, null, 2)}</pre>
{/if}