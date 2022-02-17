<script context="module">
	import { writable, derived } from 'svelte/store';

	const TIMEOUT = 5000;
	let timer;

	function createNotificationStore(timeout) {
		const _notifications = writable([]);

		function send({
			title,
			message,
			status = 'default',
			timeout,
			position = 'left-bottom',
			component = null
		}) {
			console.log('in set');
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
			return '_' + Math.random().toString(36).substr(2, 9);
		}

		const notifications = derived(_notifications, ($_notifications, set) => {
			set($_notifications);
			if ($_notifications.length > 0) {
				timer = setTimeout(() => {
					_notifications.update((state) => {
						state.shift();
						return state;
					});
				}, $_notifications[0].timeout ?? TIMEOUT);
				return () => {
					clearTimeout(timer);
				};
			}
		});
		const { subscribe } = notifications;

		return {
			subscribe,
			send,
			remove,
			default: ({ title, message, component, timeout }) =>
				send({ title, message, component, status: 'default', timeout }),
			danger: ({ title, message, component, timeout }) =>
				send({ title, message, component, status: 'danger', timeout }),
			warning: ({ title, message, component, timeout }) =>
				send({ title, message, component, status: 'warning', timeout }),
			info: ({ title, message, component, timeout }) =>
				send({ title, message, component, status: 'info', timeout }),
			success: ({ title, message, component, timeout }) =>
				send({ title, message, component, status: 'success', timeout })
		};
	}

	export const notifications = createNotificationStore();
</script>

<script>
	import { flip } from 'svelte/animate';
	import { fly } from 'svelte/transition';

	let themes = {
		danger: 'danger',
		success: 'success',
		warning: 'warning',
		info: 'info',
		default: 'neutral'
	};
	let transitionParams = { x: -150, duration: 1000 };

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

<div class="notifications">
	{#each $notifications as notification (notification.id)}
		<div
			animate:flip
			class="notification bg-{themes[notification.status]} {applyPositionStyle(
				notification.position
			)}"
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
	.notifications {
		@apply fixed grid grid-cols-1 gap-y-4 p-4 justify-start items-center;
		z-index: 9999;
	}

	.notification {
		@apply cursor-pointer max-w-lg p-2 shadow-sm;
	}

	.title, .message {
		@apply text-white block font-medium;
	}
</style>
