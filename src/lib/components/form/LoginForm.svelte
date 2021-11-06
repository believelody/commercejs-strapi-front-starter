<script>
    import { t } from '$lib/i18n';

    async function submit() {
        try {
            
        } catch (error) {
            console.log(error);
        }
    }
</script>

<style>
    /* your styles go here */
</style>

<form id="identity-form" on:submit|preventDefault>
        <fieldset class="mb-3 bg-white shadow-lg rounded text-gray-600">
            <label class="flex items-center border-b border-gray-200 h-12 py-3">
                <span class="text-right px-2">{$t("checkout.identity.email.label")}</span>
                <input type="email" name="identifier" class="focus:outline-none px-3" placeholder={$t("checkout.identity.email.placeholder")} required="">
            </label>
            <label class="flex items-center border-b border-gray-200 h-12 py-3">
                <span class="sm:text-right px-2">{$t("checkout.identity.password.label")}</span>
                <input type="password" name="password" class="flex-shrink focus:outline-none sm:px-3" placeholder={$t("checkout.identity.password.placeholder")} required="">
            </label>
            <div class="my-4 flex flex-col justify-center items-center">
                <button type="submit" class="text-center w-1/2 px-6 py-3 border border-transparent rounded-md shadow-sm text-base font-medium text-white bg-indigo-600 hover:bg-indigo-700 disabled:opacity-75">{$t("auth.login")}</button>
                <span class="px-16 my-2">{$t("common.or")}</span>
                <button class="w-1/2 text-indigo-600 font-medium hover:text-indigo-500 ml-2">{$t("auth.register")}</button>
            </div>
        </fieldset>
</form>