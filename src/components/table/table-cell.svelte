<script lang="ts">
	let {
		children,
		end = false,
		max = false
	}: { children?: any; end?: boolean; max?: boolean } = $props();
</script>

<td class:end class:max>
	{@render children?.()}
</td>

<style lang="scss">
	td {
		padding: 14px 12px;
		font-size: 12px;
		text-wrap: nowrap;
		text-overflow: ellipsis;
		overflow: hidden;

		&.end {
			text-align: right;
		}

		&.max {
			width: 100%;
		}
	}
</style>
