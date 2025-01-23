<script lang="ts">
	import { currencyFormatter } from '../actions/currency.formatter.svelte';
	import IconButton from './button/iconButton.svelte';

	let {
		title = '',
		value = 0,
		currencyId = '',
		editable = false
	}: { title?: string; value?: number; currencyId?: string; editable?: boolean } = $props();
</script>

<div class="info-header">
	<h2>{title}</h2>

	<div class="row">
		<IconButton>
			<p class="active">{currencyId}</p>
		</IconButton>
		<p class="value price-text" use:currencyFormatter={{ amount: value, currency: currencyId }}></p>
	</div>
</div>

<style lang="scss">
	.info-header {
		background-color: var(--color-surface-low);
		padding: 28px 22px;

		h2 {
			font-size: 12px;
			text-transform: uppercase;
			letter-spacing: 0.04em;
			color: var(--color-text-low);
			margin-bottom: 8px;
			font-weight: 500;
		}

		p.value {
			font-size: 36px;
			font-weight: 500;
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
</style>
