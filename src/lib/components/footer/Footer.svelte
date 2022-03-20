<script>
    import SubscriptionForm from '../forms/SubscriptionForm.svelte';
	import ExtraLinks from '../links/ExtraLinks.svelte';
	import FacebookIcon from '$elements/icon/FacebookIcon.svelte';
	import InstagramIcon from '$elements/icon/InstagramIcon.svelte';
	import LinkedinIcon from '$elements/icon/LinkedinIcon.svelte';
	import TwitterIcon from '$elements/icon/TwitterIcon.svelte';
</script>

<footer class="text-neutral-dark body-font border-t">
	<div class="container flex md:px-5 md:py-4 mx-auto">
		<div class="md:w-1/2 w-full px-4 py-2 md:py-0 border-t md:border-t-0">
			<SubscriptionForm />
		</div>
        <div class="hidden md:inline md:w-1/2 md:px-4">
            <!-- <h2 class="title-font font-medium text-neutral-900 tracking-widest text-sm mb-3">CATEGORIES</h2> -->
            <ExtraLinks />
        </div>
	</div>
	<div class="bg-neutral-light-2">
		<div class="container md:px-5 md:py-6 mx-auto flex flex-col md:flex-row-reverse items-center md:justify-between">
			<div class="grid grid-cols-4 items-center justify-around py-1 md:py-0 w-full md:w-auto">
				<a href="/" class="md:px-4 flex justify-center text-neutral-500">
					<FacebookIcon />
				</a>
				<a href="/" class="md:px-4 flex justify-center text-neutral-500">
					<TwitterIcon />
				</a>
				<a href="/" class="md:px-4 flex justify-center text-neutral-500">
					<InstagramIcon />
				</a>
				<a href="/" class="md:px-4 flex justify-center text-neutral-500">
					<LinkedinIcon />
				</a>
			</div>
			<div class="">
				<p class="text-sm text-neutral-500">
					<span>© 2021 PetsLover —</span>
					<a
						href="https://twitter.com/knyttneve"
						rel="noopener noreferrer"
						class="text-neutral-dark ml-1"
						target="_blank"
					>
						@knyttneve
					</a>
				</p>
			</div>
		</div>
	</div>
</footer>
