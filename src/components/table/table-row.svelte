<script lang="ts">
	let { children, onclick }: { children?: any; onclick?: () => void } = $props();
</script>

<tr {onclick}>
	{@render children?.()}
</tr>

<style lang="scss">
	tr {
		& :global(td) {
			&:first-child {
				border-top-left-radius: 4px;
				border-bottom-left-radius: 4px;
			}

			&:last-child {
				border-top-right-radius: 4px;
				border-bottom-right-radius: 4px;
			}
		}

		&:hover {
			cursor: pointer;

			& :global(td) {
				background-color: var(--md-surface-container-low);
			}
		}
	}
</style>
