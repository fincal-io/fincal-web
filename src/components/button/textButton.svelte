<script lang="ts">
	let { children, block, ...rest }: { children?: any; block?: boolean } = $props();
</script>

<button {...rest} class:block>
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
		}

		&:hover {
			background-color: var(--md-surface-container-low);
		}
	}
</style>
