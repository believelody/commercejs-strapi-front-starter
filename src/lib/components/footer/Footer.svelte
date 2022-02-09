<script>
    import SubscriptionForm from '../form/SubscriptionForm.svelte';
	import Links from '../links/Links.svelte';
	import FacebookIcon from '../svg/FacebookIcon.svelte';
	import InstagramIcon from '../svg/InstagramIcon.svelte';
	import LinkedinIcon from '../svg/LinkedinIcon.svelte';
	import TwitterIcon from '../svg/TwitterIcon.svelte';
</script>

<footer class="text-gray-600 body-font">
	<div class="container flex md:px-5 md:py-4 mx-auto">
		<div class="md:w-1/2 w-full px-4 py-2 md:py-0 border-t md:border-t-0">
			<SubscriptionForm />
		</div>
        <div class="hidden md:inline md:w-1/2 md:px-4">
            <!-- <h2 class="title-font font-medium text-gray-900 tracking-widest text-sm mb-3">CATEGORIES</h2> -->
            <Links />
        </div>
	</div>
	<div class="bg-gray-100">
		<div class="container md:px-5 md:py-6 mx-auto flex flex-col md:flex-row-reverse items-center md:justify-between">
			<div class="grid grid-cols-4 items-center justify-around py-1 md:py-0 w-full md:w-auto">
				<a href="/" class="md:px-4 flex justify-center text-gray-500">
					<FacebookIcon />
				</a>
				<a href="/" class="md:px-4 flex justify-center text-gray-500">
					<TwitterIcon />
				</a>
				<a href="/" class="md:px-4 flex justify-center text-gray-500">
					<InstagramIcon />
				</a>
				<a href="/" class="md:px-4 flex justify-center text-gray-500">
					<LinkedinIcon />
				</a>
			</div>
			<div class="">
				<p class="text-sm text-gray-500">
					<span>© 2021 PetsLover —</span>
					<a
						href="https://twitter.com/knyttneve"
						rel="noopener noreferrer"
						class="text-gray-600 ml-1"
						target="_blank"
					>
						@knyttneve
					</a>
				</p>
			</div>
		</div>
	</div>
</footer>
