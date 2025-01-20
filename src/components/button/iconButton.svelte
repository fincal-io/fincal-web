<script lang="ts">
	let { children, flipV, faded, size = 'md', disabled = false, ...rest }: any = $props();
</script>

<button {...rest} class:flipV class:faded class={size} class:disabled>
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
			width: 44px;
			height: 44px;
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

		&.disabled {
			opacity: 0.4;
			pointer-events: none;
			touch-action: none;
		}
	}
</style>
