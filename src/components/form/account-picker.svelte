<script lang="ts" module>
	export type SelectItem = {
		label: string;
		value: string;
	};
</script>

<script lang="ts">
	import SelectArrowDownIcon from '../../icons/selectArrowDownIcon.svelte';

	import { outsideClick } from '../../utils/outside-click';

	let {
		children,
		placeholder,
		value,
		change = () => {},
		options = [],
		...rest
	}: {
		children?: any;
		value?: string;
		placeholder?: string;
		options?: SelectItem[];
		change?: (value: string) => void;
	} = $props();

	const label = $derived(options.find((option) => option.value === value)?.label ?? '');

	let open$ = $state(false);
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

	<div class="options" class:open={open$}>
		{#each options as option}
			<button
				class="option"
				onclick={(e) => {
					e.preventDefault();
					e.stopPropagation();

					open$ = false;
					change(option.value);
				}}
			>
				{option.label}
			</button>
		{/each}
	</div>
</div>

<style lang="scss">
	.select-wrapper {
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

			&.open {
				transform: rotate(-180deg);
			}
		}
	}

	.options {
		z-index: var(--z-index-menu);
		position: absolute;
		bottom: calc(100% + 6px);
		left: -1px;
		right: -1px;
		max-height: 400px;
		overflow: hidden scroll;

		background-color: var(--color-surface-lower);
		border-radius: 4px;
		border: none;
		flex-direction: column;
		display: none;

		&.open {
			display: flex;
		}

		.option {
			padding: 14px;
			font-size: 16px;
			letter-spacing: 0.01em;
			text-align: left;
			cursor: pointer;
			transition: background-color 0.2s ease-in-out;
			background: transparent;
			outline: none;
			border: none;
			border-bottom: 1px solid var(--md-outline-variant);

			&:last-child {
				border-bottom: none;
			}

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
</style>
