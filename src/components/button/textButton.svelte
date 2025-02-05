<script lang="ts">
	let {
		children,
		block,
		faded,
		disabled = false,
		onclick,
		size = 'md',
		...rest
	}: {
		children?: any;
		block?: boolean;
		disabled?: boolean;
		faded?: boolean;
		onclick?: () => void;
		size?: 'md' | 'lg';
	} = $props();
</script>

<button {...rest} class={size} class:block class:faded {onclick} {disabled}>
	{@render children?.()}
</button>

<style lang="scss">
	button {
		background-color: transparent;
		color: var(--color-text-low);
		border: none;
		border-radius: 4px;
		padding: 10px 16px;
		font-size: 14px;
		font-weight: 600;
		letter-spacing: 0.01em;
		cursor: pointer;
		display: grid;
		place-items: center;

		&.block {
			width: 100%;
			height: 100%;
		}

		&:hover {
			background-color: var(--color-container-low);
		}

		&.faded {
			background-color: var(--color-surface-low);
			color: var(--color-text-low);

			&:hover {
				opacity: 0.9;
			}
		}

		&[disabled] {
			opacity: 0.4;
			cursor: not-allowed;
		}

		&.lg {
			padding: 12px 16px;
		}
	}
</style>
