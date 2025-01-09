<script lang="ts">
	let { children }: { children?: any } = $props();
</script>

<table>
	{@render children?.()}
</table>

<style lang="scss">
	table {
		width: 100%;
		border-collapse: collapse;
	}
</style>
