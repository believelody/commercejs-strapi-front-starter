<script>
	import { t } from '$lib/i18n';
import FacebookIcon from '../svg/FacebookIcon.svelte';
import InstagramIcon from '../svg/InstagramIcon.svelte';
import LinkedinIcon from '../svg/LinkedinIcon.svelte';
import TwitterIcon from '../svg/TwitterIcon.svelte';
</script>
<footer class="text-gray-600 body-font">
	<div class="container px-5 py-4 mx-auto">
        <!-- <div class="flex flex-wrap md:text-left text-center order-first">
        <div class="lg:w-1/4 md:w-1/2 w-full px-4">
            <h2 class="title-font font-medium text-gray-900 tracking-widest text-sm mb-3">CATEGORIES</h2>
            <nav class="list-none mb-10">
            <li>
                <a class="text-gray-600 hover:text-gray-800">First Link</a>
            </li>
            <li>
                <a class="text-gray-600 hover:text-gray-800">Second Link</a>
            </li>
            <li>
                <a class="text-gray-600 hover:text-gray-800">Third Link</a>
            </li>
            <li>
                <a class="text-gray-600 hover:text-gray-800">Fourth Link</a>
            </li>
            </nav>
        </div>
        <div class="lg:w-1/4 md:w-1/2 w-full px-4">
            <h2 class="title-font font-medium text-gray-900 tracking-widest text-sm mb-3">CATEGORIES</h2>
            <nav class="list-none mb-10">
            <li>
                <a class="text-gray-600 hover:text-gray-800">First Link</a>
            </li>
            <li>
                <a class="text-gray-600 hover:text-gray-800">Second Link</a>
            </li>
            <li>
                <a class="text-gray-600 hover:text-gray-800">Third Link</a>
            </li>
            <li>
                <a class="text-gray-600 hover:text-gray-800">Fourth Link</a>
            </li>
            </nav>
        </div>
        <div class="lg:w-1/4 md:w-1/2 w-full px-4">
            <h2 class="title-font font-medium text-gray-900 tracking-widest text-sm mb-3">CATEGORIES</h2>
            <nav class="list-none mb-10">
            <li>
                <a class="text-gray-600 hover:text-gray-800">First Link</a>
            </li>
            <li>
                <a class="text-gray-600 hover:text-gray-800">Second Link</a>
            </li>
            <li>
                <a class="text-gray-600 hover:text-gray-800">Third Link</a>
            </li>
            <li>
                <a class="text-gray-600 hover:text-gray-800">Fourth Link</a>
            </li>
            </nav>
        </div> -->
        <div class="lg:w-1/2 w-full px-4">
            <h2 class="title-font font-medium text-gray-900 tracking-widest text-sm mb-3 uppercase">{$t("footer.subscription.title")}</h2>
            <div class="flex flex-wrap sm:flex-no-wrap justify-center items-center md:justify-start">
                <div class="w-full sm:w-80 xl:mr-4 sm:mr-4 mr-0">
                    <input placeholder="{$t("footer.subscription.placeholder")}" id="footer-field" name="footer-field" class="w-full bg-gray-100 bg-opacity-50 rounded border border-gray-300 focus:bg-transparent focus:ring-2 focus:ring-indigo-200 focus:border-indigo-500 text-base outline-none text-gray-700 py-1 px-3 leading-8 transition-colors duration-200 ease-in-out">
                </div>
                <button class="mt-2 sm:mt-0 w-full sm:w-auto text-center text-white bg-indigo-500 border-0 py-2 px-6 focus:outline-none hover:bg-indigo-600 rounded">{$t("footer.subscription.cta")}</button>
            </div>
            <p class="text-gray-500 text-sm mt-2 md:text-left text-center">{$t("footer.subscription.description")}</p>
        </div>
	</div>
	<div class="bg-gray-100">
		<div class="container px-5 py-6 mx-auto flex items-center sm:flex-row flex-col">
			<a
                href="/"
				class="flex title-font font-medium items-center md:justify-start justify-center text-gray-900"
			>
				<svg
					xmlns="http://www.w3.org/2000/svg"
					fill="none"
					stroke="currentColor"
					stroke-linecap="round"
					stroke-linejoin="round"
					stroke-width="2"
					class="w-10 h-10 text-white p-2 bg-indigo-500 rounded-full"
					viewBox="0 0 24 24"
				>
					<path d="M12 2L2 7l10 5 10-5-10-5zM2 17l10 5 10-5M2 12l10 5 10-5" />
				</svg>
				<span class="ml-3 text-xl">PetsLover</span>
			</a>
			<p class="text-sm text-gray-500 sm:ml-6 sm:mt-0 mt-4">
				© 2021 PetsLover —
				<a
					href="https://twitter.com/knyttneve"
					rel="noopener noreferrer"
					class="text-gray-600 ml-1"
					target="_blank">@knyttneve</a
				>
			</p>
			<span class="inline-flex sm:ml-auto sm:mt-0 mt-4 justify-center sm:justify-start">
				<a href="/" class="text-gray-500">
					<FacebookIcon />
				</a>
				<a href="/" class="ml-3 text-gray-500">
					<TwitterIcon />
				</a>
				<a href="/" class="ml-3 text-gray-500">
					<InstagramIcon />
				</a>
				<a href="/" class="ml-3 text-gray-500">
					<LinkedinIcon />
				</a>
			</span>
		</div>
	</div>
</footer>
