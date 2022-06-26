<script>
	import { t } from '$lib/i18n';
	import { navigating } from '$app/stores';
	import { goto } from '$app/navigation';
	import { notifications } from '$lib/elements/notification/Notification.svelte';
	import { authenticated, confirmed } from '$lib/stores';
	import LoginForm from '$lib/components/forms/LoginForm.svelte';
	import RegisterForm from '$lib/components/forms/RegisterForm.svelte';

	let isLogin = true;

	function onSubmitEvent({ detail }) {
		notifications.success({
			title: $t('notifications.auth.title'),
			message:
				detail.authType === 'register'
					? $t(`notifications.auth.message.register`, { name: fullName(detail.user) })
					: $t(`notifications.auth.message.login`)
		});
		$authenticated = true;
		$confirmed = detail.user.confirmed;
		goto($navigating.from.pathname);
	}
</script>

<div class="bg-info-light-2 h-full">
	<div class="w-full h-full md:w-2/3 lg:w-1/2 mx-auto my-4">
		{#if isLogin}
			<LoginForm
				title={$t('auth.login.title')}
				on:submitEvent={onSubmitEvent}
				on:toggleAuth={() => (isLogin = false)}
			/>
		{:else}
			<RegisterForm
				title={$t('auth.register.title')}
				on:submitEvent={onSubmitEvent}
				on:toggleAuth={() => (isLogin = true)}
			/>
		{/if}
	</div>
</div>
