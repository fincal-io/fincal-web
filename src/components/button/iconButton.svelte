<script lang="ts">
	let { children, flipV, faded, size = 'md', ...rest }: any = $props();
</script>

<button {...rest} class:flipV class:faded class={size}>
	{@render children?.()}
</button>

<style lang="scss">
	button {
		display: flex;
		align-items: center;
		justify-content: center;
		width: 36px;
		height: 36px;
		border: none;
		outline: none;
		border-radius: 6px;
		background-color: transparent;
		transition: background-color 0.2s ease-in-out;
		cursor: pointer;

		&.lg {
			width: 52px;
			height: 52px;
		}

		&:hover {
			background-color: var(--md-surface-container-low);
		}

		&.flipV {
			transform: rotate(180deg);
		}

		&.faded {
			background-color: var(--md-secondary-container);

			&:hover {
				opacity: 0.9;
			}
		}
	}
</style>
