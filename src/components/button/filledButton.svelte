<script lang="ts">
	let { children, block, size, ...rest }: { children?: any; block?: boolean; size?: 'md' | 'lg' } =
		$props();
</script>

<button {...rest} class:block class={size}>
	{@render children?.()}
</button>

<style lang="scss">
	button {
		background-color: var(--md-primary-container);
		color: var(--md-on-primary-container);
		border: none;
		border-radius: 4px;
		padding: 10px 16px;
		font-size: 14px;
		font-weight: 600;
		letter-spacing: 0.01em;
		cursor: pointer;
		transition: background-color 0.2s ease-in-out;

		&.block {
			width: 100%;
		}

		&:hover {
			background-color: var(--md-on-primary);
		}

		&.lg {
			padding: 12rpx 16px;
		}
	}
</style>
