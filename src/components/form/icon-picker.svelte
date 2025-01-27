<script lang="ts">
	import CloseIcon from '../../icons/closeIcon.svelte';
	import IconButton from '../button/iconButton.svelte';

	let {
		value,
		update,
		...rest
	}: {
		update?: (value: string) => void;
		value?: string;
	} = $props();

	let open$ = $state(false);

	const icons = [
		'ti-a-b',
		'ti-a-b-2',
		'ti-a-b-off',
		'ti-abacus',
		'ti-abacus-off',
		'ti-abc',
		'ti-access-point',
		'ti-access-point-off',
		'ti-accessible',
		'ti-accessible-off',
		'ti-activity',
		'ti-activity-heartbeat',
		'ti-ad',
		'ti-ad-2',
		'ti-ad-circle',
		'ti-ad-circle-off',
		'ti-ad-off',
		'ti-address-book',
		'ti-address-book-off',
		'ti-adjustments',
		'ti-adjustments-alt',
		'ti-adjustments-bolt',
		'ti-adjustments-cancel',
		'ti-adjustments-check',
		'ti-adjustments-code',
		'ti-adjustments-cog',
		'ti-adjustments-dollar',
		'ti-adjustments-down',
		'ti-adjustments-exclamation',
		'ti-adjustments-heart',
		'ti-adjustments-horizontal',
		'ti-adjustments-minus',
		'ti-adjustments-off',
		'ti-adjustments-pause',
		'ti-adjustments-pin',
		'ti-adjustments-plus',
		'ti-adjustments-question',
		'ti-adjustments-search',
		'ti-adjustments-share',
		'ti-adjustments-spark',
		'ti-adjustments-star',
		'ti-adjustments-up',
		'ti-adjustments-x',
		'ti-aerial-lift',
		'ti-affiliate',
		'ti-ai',
		'ti-air-balloon',
		'ti-air-conditioning',
		'ti-air-conditioning-disabled',
		'ti-air-traffic-control',
		'ti-alarm',
		'ti-alarm-average',
		'ti-alarm-minus',
		'ti-alarm-off',
		'ti-alarm-plus',
		'ti-alarm-smoke',
		'ti-alarm-snooze',
		'ti-album',
		'ti-album-off'
	];
</script>

<!-- svelte-ignore a11y_click_events_have_key_events -->
<div
	class="input-wrapper"
	role="button"
	tabindex="0"
	onclick={(e) => {
		e.preventDefault();
		open$ = true;
	}}
>
	{#if !value}
		<p class:focused={open$} class="placeholder">Pick an icon</p>
	{:else}
		<p class:focused={open$}>
			<span class="color ti {value.replace('icon::', '')}"> </span>
		</p>
	{/if}
</div>

<a
	class="nav-background"
	class:open={open$}
	onclick={() => (open$ = false)}
	role="button"
	tabindex="0"
	aria-label="Close bottom sheet"
	href={null}
></a>

<div class="currency-editor-container" class:open={open$}>
	<div class="header">
		<p class="title">Pick a icon</p>
	</div>
	<div class="colors">
		{#each icons as icon}
			<button
				aria-label="Pick color"
				class={['color-wrapper ti']}
				onclick={() => {
					update?.(`icon::${icon}`);
					open$ = false;
				}}
			>
				<span class={['color-block ti', icon]}> </span>
			</button>
		{/each}
	</div>
</div>

<style lang="scss">
	.input-wrapper {
		width: 100%;
		display: flex;
		align-items: center;
		background-color: transparent;
		border-radius: 6px;
		border: 1px solid var(--color-border-variant);
		background-color: var(--color-surface-low);

		// &.faded {
		// 	background-color: var(--md-surface-container-highest);
		// }
	}

	p {
		width: 100%;
		padding: 10px 12px;
		border: 1px solid transparent;
		font-size: 16px;
		letter-spacing: 0.01em;
		background-color: transparent;
		border: 1px solid transparent;
		border-radius: 4px;

		&.focused {
			outline: none;
			border: 1px solid var(--color-primary);
		}

		&.placeholder {
			color: var(--color-text-low);
			padding: 12px 12px;
		}

		.color {
			min-height: 18px;
			display: block;
			width: 60px;
			border-radius: 4px;
			font-size: 24px;
		}
	}

	.nav-background {
		z-index: var(--z-index-nav-bg);
		position: fixed;
		inset: 0;
		background-color: rgba(0, 0, 0, 0.4);
		transform: translate(-100%);
		transition:
			opacity 0.2s linear,
			transform 0s linear 0.2s;
		opacity: 0;

		&.open {
			opacity: 1;
			transform: translate(0);
			transition:
				opacity 0.2s linear,
				transform 0s linear;
		}
	}

	.currency-editor-container {
		background-color: var(--color-container);
		position: fixed;

		bottom: 0;
		left: 0;
		right: 0;
		height: 400px;
		max-height: calc(100dvh - 60px);

		z-index: var(--z-index-nav);

		display: flex;
		flex-direction: column;

		overflow: hidden auto;

		bottom: calc(60px - 100dvh);
		transition: bottom 0.3s ease-in-out;

		&.open {
			bottom: 0;
		}
	}

	.header {
		display: flex;
		align-items: center;
		justify-content: space-between;
		gap: 12px;
		padding: 12px 4px;

		.title {
			font-size: 16px;
			font-weight: 500;
			letter-spacing: 0.02em;
		}
	}

	.colors {
		display: flex;
		flex-wrap: wrap;
		justify-content: space-between;
		padding: 0 16px 16px;
		gap: 18px;

		.color-wrapper {
			aspect-ratio: 1;
			border-radius: 6px;
			display: grid;
			place-items: center;
			cursor: pointer;
			outline: none;
			border: none;
			background-color: transparent;
			height: 48px;
			width: 48px;
			border-radius: 4px;
			border: 1px solid var(--color-border-form);

			.color-block {
				font-size: 24px;
			}
		}
	}
</style>
