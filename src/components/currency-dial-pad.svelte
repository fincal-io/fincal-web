<script>
	import BackspaceIcon from '../icons/backspaceIcon.svelte';
	import DivideIcon from '../icons/divideIcon.svelte';
	import MultiplyIcon from '../icons/multiplyIcon.svelte';
	import PlusIcon from '../icons/plusIcon.svelte';
	import SubtractIcon from '../icons/subtractIcon.svelte';
	import FilledButton from './button/filledButton.svelte';
	import IconButton from './button/iconButton.svelte';
</script>

<div class="dialpad">
	<p class="title">Enter amount</p>

	<div class="input-wrapper">
		<div class="currency">INR</div>
		<div class="input placeholder">0.00</div>
		<IconButton flipV>
			<BackspaceIcon color="var(--md-on-surface-variant)" />
		</IconButton>
	</div>

	<div class="help">This is a helper text box</div>

	<div class="number-pad">
		<div class="cell"><IconButton><p>1</p></IconButton></div>
		<div class="cell"><IconButton><p>2</p></IconButton></div>
		<div class="cell"><IconButton><p>3</p></IconButton></div>
		<div class="cell">
			<IconButton faded size="lg">
				<PlusIcon />
			</IconButton>
		</div>

		<div class="cell"><IconButton><p>4</p></IconButton></div>
		<div class="cell"><IconButton><p>5</p></IconButton></div>
		<div class="cell"><IconButton><p>6</p></IconButton></div>

		<div class="cell">
			<IconButton faded size="lg">
				<SubtractIcon />
			</IconButton>
		</div>

		<div class="cell"><IconButton><p>7</p></IconButton></div>
		<div class="cell"><IconButton><p>8</p></IconButton></div>
		<div class="cell"><IconButton><p>9</p></IconButton></div>

		<div class="cell">
			<IconButton faded size="lg">
				<MultiplyIcon />
			</IconButton>
		</div>

		<div class="cell"><IconButton><p>0</p></IconButton></div>
		<div class="cell"><IconButton><p>.</p></IconButton></div>
		<div class="cell"><IconButton><p>00</p></IconButton></div>
		<div class="cell">
			<IconButton faded size="lg">
				<DivideIcon />
			</IconButton>
		</div>
	</div>

	<div class="button">
		<FilledButton size="lg" block>Continue</FilledButton>
	</div>
</div>

<style lang="scss">
	.dialpad {
		display: flex;
		flex-direction: column;
		padding: 24px;

		.title {
			font-size: 13px;
			color: var(--md-on-surface-variant);
			margin-bottom: 18px;
		}
	}

	.input-wrapper {
		border-bottom: 1px solid var(--md-outline);
		display: flex;
		align-items: center;
		padding: 4px 0;
		gap: 20px;

		.currency {
			font-size: 13px;
			color: var(--md-on-surface-variant);
			flex: 0 0 auto;
		}

		.input {
			flex: 1 1 auto;
			font-size: 42px;
			color: var(--md-tertiary);
			font-weight: 500;
			letter-spacing: 0.02em;

			&.placeholder {
				color: var(--md-on-surface-variant);
			}
		}
	}

	.help {
		font-size: 14px;
		color: var(--md-on-surface-variant);
		margin: 12px 0 0 0;
	}

	.number-pad {
		margin: 24px 0;
		display: grid;
		grid-template-columns: repeat(4, minmax(0, 1fr));
		grid-auto-rows: 1fr;
		gap: 4px;

		&::before {
			content: '';
			width: 0;
			padding-bottom: 100%;
			grid-row: 1 / 1;
			grid-column: 1 / 1;
		}

		> *:first-child {
			grid-row: 1 / 1;
			grid-column: 1 / 1;
		}
	}

	.cell {
		display: grid;
		place-items: center;
		background-color: transparent;

		p {
			font-size: 18px;
			font-weight: 500;
		}
	}
</style>
