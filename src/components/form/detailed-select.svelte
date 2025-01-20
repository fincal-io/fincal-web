<script lang="ts" module>
	export type SelectItem = {
		label: string;
		value: string;
	};
</script>

<script lang="ts">
	import CheckFilledIcon from '../../icons/checkFilledIcon.svelte';

	import SelectArrowDownIcon from '../../icons/selectArrowDownIcon.svelte';

	import { outsideClick } from '../../utils/outside-click';
	import FilledButton from '../button/filledButton.svelte';
	import IconButton from '../button/iconButton.svelte';
	import Checkbox from './checkbox.svelte';
	import SimpleInput from './simple-input.svelte';

	let {
		children,
		placeholder,
		values = [],
		change = () => {},
		options = [],
		multi = false,
		...rest
	}: {
		children?: any;
		values?: string[];
		placeholder?: string;
		options?: SelectItem[];
		change?: (value: string[]) => void;
		multi?: boolean;
	} = $props();

	const label = $derived.by(() => {
		const arr = options
			.filter((option) => values?.includes(option.value))
			?.map((option) => option.label);

		if (arr.length > 2) {
			return `${arr.slice(0, 2).join(', ')} + ${arr.length - 2}`;
		}

		return arr.join(', ');
	});

	let open$ = $state(false);
	let query$ = $state('');
	let showSelected$ = $state(false);

	const filteredOptions$ = $derived.by(() => {
		const visibleOptions = options.filter((option) =>
			showSelected$ ? values?.includes(option.value) : true
		);

		if (!query$) return visibleOptions;

		return visibleOptions.filter((option) =>
			option.label.toLowerCase().includes(query$.toLowerCase())
		);
	});
</script>

<div
	class="select-wrapper"
	{...rest}
	class:active={open$}
	use:outsideClick={{ handler: () => (open$ = false) }}
>
	<button class="select" class:empty={!label} onclick={() => (open$ = !open$)}>
		<p>{label || placeholder}</p>

		<div class="icon" class:open={open$}>
			<SelectArrowDownIcon size={16} color="var(--md-surface-variant)" />
		</div>
	</button>
	<!-- svelte-ignore a11y_click_events_have_key_events -->
	<div
		class="dialog-wrapper"
		class:open={open$}
		onclick={() => (open$ = false)}
		role="button"
		tabindex="0"
	>
		<div
			class="dialog"
			onclick={(e) => {
				e.stopPropagation();
				e.preventDefault();
			}}
			role="button"
			tabindex="0"
		>
			<div class="query">
				<SimpleInput faded placeholder="Search" bind:value={query$} />

				<IconButton
					size="lg"
					onclick={() => {
						showSelected$ = !showSelected$;
						query$ = '';
					}}
				>
					<CheckFilledIcon
						color={showSelected$ ? 'var(--md-on-surface-variant)' : 'var(--md-secondary-container)'}
					/>
				</IconButton>
			</div>

			<div class="options">
				{#each filteredOptions$ as option}
					<button
						class="option"
						onclick={(e) => {
							e.preventDefault();
							e.stopPropagation();

							if (!multi) {
								open$ = false;
								change([option.value]);
							} else {
								if (values.includes(option.value)) {
									change(values.filter((v) => v !== option.value));
								} else {
									change([...values, option.value]);
								}
							}
						}}
					>
						<Checkbox faded checked={values.includes(option.value)} />

						{option.label}
					</button>
				{/each}
			</div>

			<div class="action">
				<FilledButton onclick={() => (open$ = false)} block size="lg">Save</FilledButton>
			</div>
		</div>
	</div>
</div>

<style lang="scss">
	.select-wrapper {
		width: 100%;
		display: flex;
		align-items: center;
		background-color: var(--md-surface-container-high);
		border-radius: 4px;
		border: 1px solid transparent;
		position: relative;

		&.active {
			border: 1px solid var(--md-primary);
		}
	}

	.select {
		width: 100%;
		padding: 11px 12px;
		border: 1px solid transparent;
		background-color: transparent;
		outline: none;
		text-align: left;
		cursor: pointer;
		display: flex;
		align-items: center;

		p {
			flex: 1 1 auto;
			font-size: 13px;
		}

		&.empty {
			p {
				color: var(--md-on-surface-variant);
				opacity: 0.4;
			}
		}

		.icon {
			flex: 0 0 auto;
			transition: transform 0.2s ease-in-out;

			&.open {
				transform: rotate(-180deg);
			}
		}
	}

	.dialog-wrapper {
		z-index: var(--z-index-menu);
		position: fixed;
		inset: 0;
		display: grid;
		place-items: center;
		background-color: rgba(0, 0, 0, 0.3);
		display: none;
		padding: 24px;

		&.open {
			display: grid;
		}

		.dialog {
			width: 100%;
			height: 100%;
			background-color: var(--md-surface-container-high);
			border-radius: 6px;
			display: flex;
			flex-direction: column;
			overflow: hidden;

			.query {
				padding: 16px;
				flex: 0 0 auto;

				display: flex;
				align-items: center;
				gap: 12px;
			}

			.action {
				padding: 16px;
				flex: 0 0 auto;

				display: flex;
				align-items: center;
				gap: 12px;
			}

			.options {
				flex: 1 1 auto;
				overflow: hidden scroll;
				border-radius: 4px;
				border: none;
				flex-direction: column;
				display: flex;
				padding-bottom: 2px;

				.option {
					display: flex;
					align-items: center;
					gap: 12px;

					padding: 14px 20px;
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
					}
				}
			}
		}
	}
</style>
