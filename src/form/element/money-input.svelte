<script lang="ts">
	import { onMount, untrack } from 'svelte';
	import IconButton from '../../components/button/iconButton.svelte';
	import { workspaceState$ } from '../../states/workspace.state.svelte';
	import { outsideClick } from '../../utils/outside-click';
	import type { FormElementProp } from '../form.svelte';
	import { currencyFormatter } from '../../actions/currency.formatter.svelte';
	import CurrencyDialPad from '../../components/currency-dial-pad.svelte';

	let { control, updateState, form }: FormElementProp = $props();

	let open$ = $state(false);
	let openCurrency$ = $state(false);

	let availableCurrencies$ = $derived(
		workspaceState$.currencies
			.filter((c) => workspaceState$.workspace?.enabledCurrencyIds?.includes(c.code || ''))
			.map((c) => ({
				label: c.code?.toLocaleUpperCase() || '',
				value: c.code || ''
			}))
	);

	let value$ = $state({
		currencyId: '',
		amount: 0
	});

	onMount(() => {
		value$ = {
			currencyId:
				form.value$[control.attributes?.currencyField] || control.attributes?.defaultCurrencyId,
			amount:
				form.value$[control.attributes?.amountField] || Number(control.attributes?.defaultAmount)
		};
	});

	$effect(() => {
		const currencyId = value$.currencyId;
		const amount = value$.amount;

		untrack(() => {
			updateState((value) => {
				return {
					...value,
					[control.attributes?.currencyField]: currencyId,
					[control.attributes?.amountField]: amount
				};
			});
		});
	});
</script>

<div class="info-header">
	<h2>{control.attributes?.title}</h2>

	<div class="row" use:outsideClick={{ handler: () => (openCurrency$ = false) }}>
		<IconButton onclick={() => (openCurrency$ = true)}>
			<p class="active">{form.value$[control.attributes?.currencyField]}</p>
		</IconButton>
		<button
			aria-label="Price"
			onclick={() => {
				open$ = true;
			}}
			class="value price-text"
			use:currencyFormatter={{
				amount: value$.amount,
				currency: value$.currencyId
			}}
		></button>
	</div>

	<div class="options" class:open={openCurrency$}>
		{#each availableCurrencies$ as option}
			<button
				class="option"
				onclick={(e) => {
					e.preventDefault();
					e.stopPropagation();

					open$ = false;
					value$.currencyId = option.value;
				}}
			>
				{option.label}
			</button>
		{/each}
	</div>
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
		currencyId={form.value$[control.attributes?.currencyField]}
		value={form.value$[control.attributes?.amountField]}
		update={(v) => {
			open$ = false;
			value$.amount = v;
		}}
	/>
</div>

<style lang="scss">
	.info-header {
		background-color: var(--color-surface-low);
		padding: 24px 18px;
		position: relative;
		margin-bottom: 24px;

		h2 {
			font-size: 12px;
			text-transform: uppercase;
			letter-spacing: 0.04em;
			color: var(--color-text-low);
			margin-bottom: 8px;
			font-weight: 500;
		}

		.value {
			font-size: 36px;
			font-weight: 500;
			background-color: transparent;
			outline: none;
			border: none;
			cursor: pointer;
		}
	}

	.row {
		display: flex;
		align-items: center;
		gap: 12px;

		.active {
			font-size: 12px;
			text-transform: uppercase;
			font-weight: 600;
			color: var(--color-text-lower);
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

	.options {
		z-index: var(--z-index-menu);
		position: absolute;
		top: 94px;
		left: 18px;
		max-height: 400px;
		width: 80px;
		overflow: hidden scroll;

		background-color: var(--color-container-high);
		border-radius: 4px;
		border: none;
		flex-direction: column;
		display: none;

		&.open {
			display: flex;
		}

		.option {
			padding: 14px 12px;
			font-size: 13px;
			text-align: left;
			cursor: pointer;
			transition: background-color 0.2s ease-in-out;
			background: transparent;
			outline: none;
			border: none;
			border-bottom: 1px solid var(--md-outline-variant);

			&:hover {
				background-color: var(--md-surface-container-highest);
			}

			&:first-child {
				border-radius: 4px 4px 0 0;
			}

			&:last-child {
				border-radius: 0 0 4px 4px;
				border: none;
			}
		}
	}
</style>
