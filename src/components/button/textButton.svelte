<script lang="ts">
	let {
		children,
		block,
		faded,
		disabled = false,
		onclick,
		...rest
	}: {
		children?: any;
		block?: boolean;
		disabled?: boolean;
		faded?: boolean;
		onclick?: () => void;
	} = $props();
</script>

<button {...rest} class:block class:faded {onclick} {disabled}>
	{@render children?.()}
</button>

<style lang="scss">
	button {
		background-color: transparent;
		color: var(--md-on-surface-variant);
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
			background-color: var(--md-surface-container-low);
		}

		&.faded {
			background-color: var(--md-tertiary-container);
			color: var(--md-on-tertiary-container);

			&:hover {
				opacity: 0.9;
			}
		}

		&[disabled] {
			opacity: 0.4;
			cursor: not-allowed;
		}
	}
</style>
