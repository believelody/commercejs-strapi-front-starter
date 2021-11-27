<script>
    import { t } from '$lib/i18n';
import ProtectedLayout from '../../lib/components/layout/ProtectedLayout.svelte';
</script>

<ProtectedLayout>
    <div class="w-full flex">
        <aside class="bg-green-400 w-1/3 flex flex-col">
            <ul>
                <li>
                    <a href="/">{$t("account.orders.link")}</a>
                </li>
                <li>
                    <a href="/">{$t("account.profile.link")}</a>
                </li>
                <li>
                    <button>{$t("account.logout")}</button>
                </li>
            </ul>
        </aside>
        <article class="bg-blue-600 w-2/3">
            <slot />
        </article>
    </div>
</ProtectedLayout>