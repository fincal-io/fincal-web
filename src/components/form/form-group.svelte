<script lang="ts">
	let { children, label = '' }: { children?: any; label?: string } = $props();
</script>

<div class="form-group">
	<label>
		<p>{label}</p>
		{@render children?.()}
	</label>
</div>

<style lang="scss">
	.form-group {
		width: 100%;
		padding: 16px 18px;
	}

	label {
		p {
			font-size: 13px;
			letter-spacing: 0.02em;
			color: var(--color-text-low);
			margin-bottom: 10px;
			font-weight: 400;
		}
	}
</style>
