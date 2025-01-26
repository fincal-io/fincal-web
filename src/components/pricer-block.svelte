<script lang="ts">
	import { currencyFormatter } from '../actions/currency.formatter.svelte';
	import { workspaceState$ } from '../states/workspace.state.svelte';
	import { outsideClick } from '../utils/outside-click';
	import IconButton from './button/iconButton.svelte';
	import CurrencyDialPad from './currency-dial-pad.svelte';

	let {
		title = '',
		value = 0,
		currencyId = '',
		attached = false
	}: {
		title?: string;
		value?: number;
		currencyId?: string;
		attached?: boolean;
	} = $props();
</script>

<div class="info-header" class:attached>
	<h2>{title}</h2>

	<p class="value price-text" use:currencyFormatter={{ amount: value, currency: currencyId }}></p>
</div>

<style lang="scss">
	.info-header {
		background-color: var(--color-surface-low);
		padding: 24px 18px;
		position: relative;

		&.attached {
			padding-bottom: 8px;
		}

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
</style>
