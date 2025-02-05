<script lang="ts">
	import { datetime, Frequency, RRule, RRuleSet, rrulestr } from 'rrule';
	import IconButton from '../button/iconButton.svelte';
	import CloseIcon from '../../icons/closeIcon.svelte';
	import SelectArrowDownIcon from '../../icons/selectArrowDownIcon.svelte';
	import FilledButton from '../button/filledButton.svelte';
	import Header from '../header.svelte';
	import TextButton from '../button/textButton.svelte';
	import SingleDatePicker from '../single-date-picker.svelte';
	import { stopPropagation } from '../../utils/stop-propagation';

	const {
		value,
		change,
		placeholder,
		...rest
	}: {
		value?: string;
		placeholder?: string;
		change?: (value: string) => void;
	} = $props();

	let view = $state<{
		state: '' | 'freq' | 'startDate';
		freq: Frequency;
		startDate: Date;
	}>({ state: '', freq: RRule.MONTHLY, startDate: new Date() });

	let label = $derived.by(() => {
		if (!value) {
			return '';
		}

		const rrule = RRule.fromString(value);

		const nextDate = rrule.after(new Date()) || new Date();

		switch (rrule.options.freq) {
			case RRule.WEEKLY: {
				const formatter = Intl.DateTimeFormat(navigator.languages[0], { weekday: 'long' });
				return `Weekly on ${formatter.format(nextDate)}`;
			}
			case RRule.MONTHLY: {
				const formatter = Intl.DateTimeFormat(navigator.languages[0], { day: 'numeric' });
				return `Monthly on ${formatter.format(nextDate)}`;
			}
			case RRule.YEARLY: {
				const formatter = Intl.DateTimeFormat(navigator.languages[0], {
					day: 'numeric',
					month: 'short'
				});
				return `Yearly on ${formatter.format(nextDate)}`;
			}
			default: {
				return 'Unsupported';
			}
		}
	});

	const visibilityOptions = [
		{
			label: 'Weekly',
			value: RRule.WEEKLY
		},
		{
			label: 'Monthly',
			value: RRule.MONTHLY
		},
		{
			label: 'Yearly',
			value: RRule.YEARLY
		}
	];

	const apply = () => {
		const rrule = new RRule({
			freq: view.freq,
			dtstart: view.startDate
		});

		view.state = '';

		change?.(rrule.toString());
	};
</script>

<!-- svelte-ignore a11y_click_events_have_key_events -->
<div class="wrapper" {...rest} class:active={view.state !== ''}>
	<div class="row">
		<button class="select" class:empty={!label} onclick={() => (view.state = 'freq')}>
			<p>{label || placeholder}</p>

			<div class="icon" class:open={view.state !== ''}>
				<SelectArrowDownIcon size={16} color="var(--md-surface-variant)" />
			</div>
		</button>
	</div>
</div>

{#if view.state === 'freq'}
	<div class="dialog-wrapper open">
		<div class="dialog open">
			<Header title="Frequency" showNav={false}>
				<IconButton onclick={() => (view.state = '')}>
					<CloseIcon color="var(--color-text-lower)" />
				</IconButton>
			</Header>

			<div class="dialog-content">
				<div class="options">
					{#each visibilityOptions as option}
						<TextButton
							size="lg"
							block
							faded
							onclick={() => {
								view.freq = option.value;
								view.state = 'startDate';
							}}
						>
							{option.label}
						</TextButton>
					{/each}
				</div>
			</div>
		</div>
	</div>
{/if}

{#if view.state === 'startDate'}
	<div class="dialog-wrapper open">
		<div class="dialog open">
			<Header title="Next charge date" showNav={false}>
				<IconButton onclick={() => (view.state = '')}>
					<CloseIcon color="var(--color-text-lower)" />
				</IconButton>
			</Header>

			<div class="dialog-content">
				<SingleDatePicker
					selectedDate={view.startDate}
					setSelectedDate={(date) => {
						view.startDate = date;
					}}
				/>

				<TextButton size="lg" block faded onclick={apply}>Continue</TextButton>
			</div>
		</div>
	</div>
{/if}

<style lang="scss">
	.wrapper {
		width: 100%;
		display: flex;
		align-items: center;
		border: 1px solid var(--color-border-variant);
		background-color: var(--color-surface-low);
		border-radius: 4px;
		position: relative;

		&.active {
			border: 1px solid var(--color-primary);
		}
	}

	.row {
		display: flex;
		width: 100%;
		align-items: center;

		button {
			flex: 1 1 auto;
		}
	}

	.select {
		width: 100%;
		padding: 12px;
		border: 1px solid transparent;
		background-color: transparent;
		outline: none;
		text-align: left;
		cursor: pointer;
		display: flex;
		align-items: center;

		p {
			flex: 1 1 auto;
			font-size: 16px;
			letter-spacing: 0.01em;
		}

		&.empty {
			p {
				color: var(--color-text-lower);
				opacity: 0.4;
			}
		}

		.icon {
			flex: 0 0 auto;
			transition: transform 0.2s ease-in-out;
			transform: rotate(-90deg);

			&.open {
				transform: rotate(-180deg);
			}
		}
	}

	.dialog-wrapper {
		z-index: var(--z-index-nav-bg);
		position: fixed;
		inset: 0;
		background-color: rgba(0, 0, 0, 0.4);
		transform: translate(-100%);
		transition:
			opacity 0.2s linear,
			transform 0s linear 0.2s;
		opacity: 0;

		display: grid;
		place-items: center;

		&.open {
			opacity: 1;
			transform: translate(0);
			transition:
				opacity 0.2s linear,
				transform 0s linear;
		}
	}

	.dialog {
		background-color: var(--color-container);
		max-height: 90dvh;
		width: 420px;
		max-width: 90dvw;
		z-index: var(--z-index-nav);

		display: flex;
		flex-direction: column;

		overflow: hidden auto;

		left: -360px;
		transition: left 0.3s ease;

		&.open {
			left: 0;
		}
	}

	.dialog-content {
		padding: 18px;

		display: flex;
		flex-direction: column;
		gap: 18px;

		.options {
			display: flex;
			flex-direction: column;
			gap: 12px;
		}
	}
</style>
