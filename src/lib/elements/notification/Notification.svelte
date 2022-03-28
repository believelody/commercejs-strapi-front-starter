<script context="module">
	import { writable, derived } from 'svelte/store';

	const TIMEOUT = 5000;
	let timer;

	function createNotificationStore(timeout) {
		const _notifications = writable([]);

		function send({
			title,
			message,
			status,
			timeout = TIMEOUT,
			position = "top-left",
			component = null
		}) {
			_notifications.update((state) => {
				return [...state, { id: id(), status, title, message, timeout, position, component }];
			});
		}

		function remove(notificationId) {
			_notifications.update((state) =>
				state.filter((notification) => notification.id !== notificationId)
			);
		}

		function id() {
			return '_' + Math.random().toString(36).substring(2, 9);
		}

		const derivedNotifications = derived(_notifications, ($_notifications, set) => {
			set($_notifications);
			if ($_notifications.length > 0) {
				timer = setTimeout(() => {
					_notifications.update((state) => {
						state.shift();
						return state;
					});
				}, $_notifications[0].timeout);
				return () => {
					clearTimeout(timer);
				};
			}
		});
		const { subscribe } = derivedNotifications;

		return {
			subscribe,
			send,
			remove,
			default: ({ title, message, position, component, timeout }) =>
				send({ title, message, position, component, status: 'default', timeout }),
			danger: ({ title, message, position, component, timeout }) =>
				send({ title, message, position, component, status: 'danger', timeout }),
			warning: ({ title, message, position, component, timeout }) =>
				send({ title, message, position, component, status: 'warning', timeout }),
			info: ({ title, message, position, component, timeout }) =>
				send({ title, message, position, component, status: 'info', timeout }),
			success: ({ title, message, component, position, timeout }) =>
				send({ title, message, position, component, status: 'success', timeout })
		};
	}

	export const notifications = createNotificationStore();
</script>

<script>
	import { flip } from 'svelte/animate';
	import { fly } from 'svelte/transition';
	import { media } from "$lib/stores";

	let themes = {
		danger: 'danger',
		success: 'success',
		warning: 'warning',
		info: 'info',
		default: 'neutral'
	};
	const transitionParams = { x: -150, duration: 1000 };

	const applyPositionStyle = (position) => {
		switch (position) {
			case 'top-right':
			case 'right-top':
				return 'top-0 right-0';
			case 'top-center':
			case 'center-top':
				return 'top-0 left-1/2 transform-gpu -translate-x-1/2';
			case 'bottom-left':
			case 'left-bottom':
				return 'bottom-0 left-0';
			case 'bottom-center':
			case 'center-bottom':
				return 'bottom-0 left-1/2 transform-gpu -translate-x-1/2';
			case 'full-center':
				return 'top-1/2 left-1/2 transform-gpu -translate-x-1/2 -translate-y-1/2';
			case 'left-center':
			case 'center-left':
				return 'top-1/2 left-0 transform-gpu -translate-y-1/2';
			case 'right-center':
			case 'center-right':
				return 'top-1/2 right-0 transform-gpu -translate-y-1/2';
			case 'bottom-right':
			case 'right-bottom':
				return 'bottom-0 right-0';
			case 'top-left':
			case 'left-top':
			default:
				return 'top-0 left-0';
		}
	};

	const handleButtonClick = (notificationId) => {
		notifications.remove(notificationId);
	};
</script>

<div class="notifications p-{$notifications.length ? 4 : 0}">
	{#each $notifications as notification (notification.id)}
		<div
			animate:flip
			class="notification bg-{themes[notification.status]} {$media.mobile ? "top-center" : applyPositionStyle(notification.position)}"
			in:fly={transitionParams}
			out:fly={transitionParams}
			on:click={() => handleButtonClick(notification.id)}
		>
			{#if notification.component}
				{notification.component}
			{:else}
				<h3 class="title">{notification.title}</h3>
				<div class="message">{notification.message}</div>
			{/if}
		</div>
	{/each}
</div>

<style>
	@import "../../../styles/tailwind-output.css";
	.notifications {
		@apply fixed grid grid-cols-1 gap-y-4 justify-start items-center;
		z-index: 9999;
	}

	.notification {
		@apply cursor-pointer max-w-lg p-4 shadow-sm rounded;
	}

	.title, .message {
		@apply text-white;
	}
	.title {
		@apply font-medium underline;
	}
</style>