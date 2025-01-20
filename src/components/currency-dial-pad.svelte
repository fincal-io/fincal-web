<script lang="ts">
	import BackspaceIcon from '../icons/backspaceIcon.svelte';
	import DivideIcon from '../icons/divideIcon.svelte';
	import MultiplyIcon from '../icons/multiplyIcon.svelte';
	import PlusIcon from '../icons/plusIcon.svelte';
	import SubtractIcon from '../icons/subtractIcon.svelte';
	import { workspaceState$ } from '../states/workspace.state.svelte';
	import FilledButton from './button/filledButton.svelte';
	import IconButton from './button/iconButton.svelte';
	import TextButton from './button/textButton.svelte';

	let {
		currencyId,
		value,
		update,
		...rest
	}: {
		currencyId?: string;
		update?: (value: number) => void;
		value?: number;
	} = $props();

	let currency$ = $derived(workspaceState$.currencies?.find((c) => c.code === currencyId));

	let input$ = $state('');

	const onInput = (k: string) => {
		switch (k) {
			case '<': {
				input$ = input$.slice(0, -1);
				break;
			}
			case '.': {
				if (input$.includes('.')) {
					break;
				}

				input$ = `${input$}.`;
				break;
			}
			default: {
				input$ = `${input$}${k}`;
			}
		}
	};

	const save = () => {
		if (input$) {
			update?.(Number(`0${input$}`));
		}
	};
</script>

<div class="dialpad">
	<p class="title">Enter amount</p>

	<div class="input-wrapper">
		<div class="button-wrapper">
			<IconButton>
				<div class="currency">{currency$?.code?.toLocaleUpperCase()}</div>
			</IconButton>
		</div>
		<div class="input" class:placeholder={!input$}>{input$ || '0.00'}</div>
		<div class="button-wrapper">
			<IconButton flipV onclick={() => onInput('<')}>
				<BackspaceIcon color="var(--md-on-surface-variant)" />
			</IconButton>
		</div>
	</div>

	<div class="help">This is a helper text box</div>

	<div class="number-pad">
		<div class="cell"><TextButton block onclick={() => onInput('1')}><p>1</p></TextButton></div>
		<div class="cell"><TextButton block onclick={() => onInput('2')}><p>2</p></TextButton></div>
		<div class="cell"><TextButton block onclick={() => onInput('3')}><p>3</p></TextButton></div>
		<!-- <div class="cell">
			<TextButton block onclick={() => onInput('+')} faded size="lg">
				<PlusIcon />
			</TextButton>
		</div> -->

		<div class="cell"><TextButton block onclick={() => onInput('4')}><p>4</p></TextButton></div>
		<div class="cell"><TextButton block onclick={() => onInput('5')}><p>5</p></TextButton></div>
		<div class="cell"><TextButton block onclick={() => onInput('6')}><p>6</p></TextButton></div>

		<!-- <div class="cell">
			<TextButton block faded size="lg" onclick={() => onInput('-')}>
				<SubtractIcon />
			</TextButton>
		</div> -->

		<div class="cell"><TextButton block onclick={() => onInput('7')}><p>7</p></TextButton></div>
		<div class="cell"><TextButton block onclick={() => onInput('8')}><p>8</p></TextButton></div>
		<div class="cell"><TextButton block onclick={() => onInput('9')}><p>9</p></TextButton></div>

		<!-- <div class="cell">
			<TextButton block faded size="lg" onclick={() => onInput('x')}>
				<MultiplyIcon />
			</TextButton>
		</div> -->

		<div class="cell"><TextButton block onclick={() => onInput('0')}><p>0</p></TextButton></div>
		<div class="cell">
			<TextButton block disabled={input$.includes('.')} onclick={() => onInput('.')}
				><p>.</p></TextButton
			>
		</div>
		<div class="cell"><TextButton block onclick={() => onInput('00')}><p>00</p></TextButton></div>
		<!-- <div class="cell">
			<IconButton faded size="lg" onclick={() => onInput('/')}>
				<DivideIcon />
			</IconButton>
		</div> -->
	</div>

	<div class="button">
		<FilledButton onclick={() => save()} size="lg" block>Continue</FilledButton>
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
		overflow: hidden;
		width: 100%;

		.button-wrapper {
			flex: 0 0 auto;
			display: grid;
			place-items: center;
		}

		.currency {
			font-size: 13px;
			color: var(--md-on-surface-variant);
		}

		.input {
			flex: 1 1 auto;
			font-size: 42px;
			color: var(--md-tertiary);
			font-weight: 500;
			letter-spacing: 0.02em;
			text-wrap: nowrap;
			overflow: hidden;
			display: flex;
			justify-content: flex-end;

			&.placeholder {
				color: var(--md-secondary-container);
			}
		}
	}

	.help {
		font-size: 14px;
		color: var(--md-on-surface-variant);
		margin: 12px 0 0 0;
	}

	.number-pad {
		margin: 24px auto;
		display: grid;
		grid-template-columns: repeat(3, minmax(0, 1fr));
		grid-auto-rows: 1fr;
		gap: 4px;
		width: 300px;

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
