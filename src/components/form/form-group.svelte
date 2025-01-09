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
	}

	label {
		p {
			font-size: 12px;
			letter-spacing: 0.02em;
			color: var(--md-on-surface-variant);
			margin-bottom: 10px;
			opacity: 0.8;
			font-weight: 400;
		}
	}
</style>
