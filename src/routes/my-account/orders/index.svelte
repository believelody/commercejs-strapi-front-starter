<script context="module">
    import api from '$lib/api';
    
    export async function load() {
        const res = await api.order.getOrders();

        if (res.error) {
            return {
                props: { error: res.error }
            };
        }

        return {
            props: {
                orders: res.orders,
                pagination: res.meta.pagination
            }
        }
    }
</script>
<script>
    import { t } from '$lib/i18n';

    export let orders = [], pagination = null, error = null;
</script>

<style>
    section {
        position: absolute;
        top: 50%;
        left: 50%;
        transform: translate3d(-50%, -50%, 0);
    }
</style>

{#each orders as order}
    <pre>{JSON.stringify(order, null, 2)}</pre>
{:else}
    <section class="rounded p-6 w-auto bg-indigo-200 flex flex-col justify-center">
        <span>{$t("order.empty")}</span>
        <a href="/" class="underline hover:text-blue-700">{$t("order.link")}</a>
    </section>
{/each}