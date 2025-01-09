<script lang="ts">
	let {
		children,
		placeholder,
		type = 'text',
		value = $bindable(''),
		...rest
	}: { children?: any; placeholder?: string; type?: string; value?: string } = $props();
</script>

<div class="input-wrapper">
	<input {...rest} {type} {placeholder} />
</div>

<style lang="scss">
	.input-wrapper {
		width: 100%;
		display: flex;
		align-items: center;
		background-color: var(--md-surface-container-high);
		border-radius: 4px;
	}

	input {
		width: 100%;
		padding: 12px 12px;
		border: 1px solid transparent;
		font-size: 13px;
		letter-spacing: 0.01em;
		background-color: transparent;
		border: 1px solid transparent;
		border-radius: 4px;

		&:focus {
			outline: none;
			border: 1px solid var(--md-primary);
		}

		&::placeholder {
			color: var(--md-on-surface-variant);
			opacity: 0.4;
		}
	}
</style>
