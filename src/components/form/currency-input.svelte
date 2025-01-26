<script lang="ts">
	import { workspaceState$ } from '../../states/workspace.state.svelte';
	import CurrencyDialPad from '../currency-dial-pad.svelte';

	let {
		placeholder,
		currencyId,
		value,
		update,
		borderless = false,
		...rest
	}: {
		currencyId?: string;
		placeholder?: string;
		update?: (value: number) => void;
		value?: number;
		borderless?: boolean;
	} = $props();

	let open$ = $state(false);

	let total = $derived.by(() => {
		const c = workspaceState$.currencies?.find((c) => c.code === currencyId);

		if (!c) {
			return '--';
		}

		const formatter = Intl.NumberFormat(c.locale, { style: 'currency', currency: c.code });

		return formatter.format(value || 0);
	});
</script>

<!-- svelte-ignore a11y_click_events_have_key_events -->
<div
	class="input-wrapper"
	role="button"
	tabindex="0"
	onclick={() => (open$ = true)}
	class:borderless
>
	{#if value === undefined || value === null}
		<p class:focused={open$} class="placeholder">{total}</p>
	{:else}
		<p class="price-text" class:focused={open$}>{total}</p>
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
	<CurrencyDialPad
		{currencyId}
		{value}
		update={(v) => {
			open$ = false;
			update?.(v);
		}}
	/>
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

		&.faded {
			background-color: var(--md-surface-container-highest);
		}

		&.borderless {
			border: none;
			background-color: transparent;
		}
	}

	p {
		width: 100%;
		padding: 12px;
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
</style>
