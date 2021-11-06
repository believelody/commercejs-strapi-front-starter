<script>
    import { t } from '$lib/i18n'
    export let information, title;
</script>

<style>
    * {
        box-sizing: border-box;
    }
</style>

<form id="address-form">
    <h2 class="uppercase tracking-wide text-xl font-semibold text-gray-700 my-2">{title}</h2>
    <fieldset class="mb-3 bg-white shadow-xl rounded text-gray-600 flex-wrap flex">
        <div class="w-full flex flex-col xl:flex-row justify-between xl:border-b xl:border-gray-300">
            <label class="w-full xl:w-1/2 flex h-12 py-3 items-center border-b border-gray-300 xl:border-none">
                <span class="text-right px-2">{$t("checkout.address.name.label")}</span>
                <input name="name" class="focus:outline-none px-3" placeholder={$t("checkout.address.name.placeholder")} required="">
            </label>
            <label class="w-full xl:w-1/2 flex h-12 py-3 items-center border-b border-gray-300 xl:border-none">
                <span class="sm:text-right px-2">{$t("checkout.address.email.label")}</span>
                <input name="email" type="email" class="focus:outline-none px-3" placeholder={$t("checkout.address.email.placeholder")} required="">
            </label>
        </div>
        <div class="w-full flex flex-col xl:flex-row justify-between xl:border-b xl:border-gray-300">
            <label class="w-full xl:w-1/2 flex h-12 py-3 items-center border-b border-gray-300 xl:border-none">
                <span class="sm:text-right px-2">{$t("checkout.address.address1.label")}</span>
                <input name="address1" class="focus:outline-none px-3" placeholder={$t("checkout.address.address1.placeholder")}>
            </label>
            <label class="w-full xl:w-1/2 flex h-12 py-3 items-center border-b border-gray-300 xl:border-none">
                <span class="sm:text-right px-2">{$t("checkout.address.address2.label")}</span>
                <input name="address2" class="focus:outline-none px-3" placeholder={$t("checkout.address.address2.placeholder")}>
            </label>
        </div>
        <div class="w-full flex flex-col xl:flex-row xl:border-b xl:border-gray-300">
            <label class="flex items-center py-3 px-0 xl:px-2 border-b border-gray-300 xl:border-none">
                <span class="sm:text-right px-2 xl:mr-2">{$t("checkout.address.city.label")}</span>
                <input name="city" class="focus:outline-none px-3 xl:px-0" placeholder={$t("checkout.address.city.placeholder")}>
            </label>
            <label class="flex xl:justify-between items-center py-3 px-0 xl:px-2 border-b border-gray-300 xl:border-none">
                <span class="sm:text-rigth px-2 ">{$t("checkout.address.zip.label")}</span>
                <input name="zip" class="focus:outline-none" placeholder={$t("checkout.address.zip.placeholder")}>
            </label>
            <label class="flex items-center py-3 px-0 xl:px-2 border-b border-gray-300 xl:border-none">
                <span class="sm:text-right px-2 xl:mr-2">{$t("checkout.address.department.label")}</span>
                <input name="department" class="focus:outline-none px-3 xl:px-0" placeholder={$t("checkout.address.department.placeholder")}>
            </label>
        </div>
        <div class="w-full flex flex-col xl:flex-row justify-between">
            <label class="flex xl:w-1/2 border-b border-gray-300 xl:border-none w-full py-3 px-0 xl:px-2">
                <span class="text-right px-2 xl:px-0 xl:mr-2">{$t("checkout.address.region.label")}</span>
                <input name="region" class="focus:outline-none px-3 xl:px-0" placeholder={$t("checkout.address.region.placeholder")}>
            </label>
            <label class="flex xl:w-1/2 w-full h-12 py-3 items-center select relative px-0 xl:px-2">
                <span class="text-right px-2 xl:px-0 xl:mr-2">{$t("checkout.address.country.label")}</span>
                <div id="country" class="focus:outline-none px-3 xl:px-0 flex flex-grow items-center">
                    <select name="country" class="text-center flex-grow bg-transparent flex-1 cursor-pointer focus:outline-none">
                        <option value="AU">Australia</option>
                        <option value="BE">Belgium</option>
                        <option value="BR">Brazil</option>
                        <option value="CA">Canada</option>
                        <option value="CN">China</option>
                        <option value="DK">Denmark</option>
                        <option value="FI">Finland</option>
                        <option value="FR">France</option>
                        <option value="DE">Germany</option>
                        <option value="HK">Hong Kong</option>
                        <option value="IE">Ireland</option>
                        <option value="IT">Italy</option>
                        <option value="JP">Japan</option>
                        <option value="LU">Luxembourg</option>
                        <option value="MX">Mexico</option>
                        <option value="NL">Netherlands</option>
                        <option value="PL">Poland</option>
                        <option value="PT">Portugal</option>
                        <option value="SG">Singapore</option>
                        <option value="ES">Spain</option>
                        <option value="TN">Tunisia</option>
                        <option value="GB">United Kingdom</option>
                        <option value="US" selected="selected">United States</option>
                    </select>
                </div>
            </label>
        </div>
    </fieldset>
</form>