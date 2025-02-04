<script lang="ts">
	let {
		children,
		placeholder,
		type = 'text',
		value = '',
		setValue = () => {},
		faded = false,
		...rest
	}: {
		children?: any;
		placeholder?: string;
		type?: string;
		value?: string;
		setValue?: (value: string) => void;
		faded?: boolean;
	} = $props();
</script>

<div class="input-wrapper" class:faded>
	<input
		{...rest}
		{type}
		{placeholder}
		{value}
		oninput={(e) => setValue(e.currentTarget?.value ?? '')}
	/>
</div>

<style lang="scss">
	.input-wrapper {
		width: 100%;
		display: flex;
		align-items: center;
		background-color: transparent;
		border-radius: 6px;
		border: 1px solid var(--color-border-variant);
		background-color: var(--color-surface-low);

		&.faded {
			background-color: var(--color-container-high);
		}
	}

	input {
		width: 100%;
		padding: 12px;
		border: 1px solid transparent;
		font-size: 16px;
		letter-spacing: 0.01em;
		background-color: transparent;
		border: 1px solid transparent;
		border-radius: 4px;

		&:focus {
			outline: none;
			border: 1px solid var(--color-primary);
		}

		&::placeholder {
			color: var(--color-text-low);
			opacity: 0.4;
		}
	}
</style>
