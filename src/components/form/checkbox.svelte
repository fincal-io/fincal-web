<!-- Checkbox.svelte -->
<script lang="ts">
	import CheckIcon from '../../icons/checkIcon.svelte';

	interface Props {
		checked?: boolean;
		label?: string;
		disabled?: boolean;
		name?: string;
		value?: string;
		required?: boolean;
		faded?: boolean;
		size?: 'md' | 'lg';
	}

	let {
		checked = $bindable(false),
		label = '',
		disabled = false,
		name = '',
		size = 'md',
		value = '',
		required = false,
		faded = false
	}: Props = $props();
</script>

<label class={['checkbox-container', size]} class:disabled class:checked class:faded>
	<input type="checkbox" {name} {value} {disabled} {required} bind:checked />
	{#if checked}
		<div class="checkmark">
			<CheckIcon size={16} />
		</div>
	{/if}

	{#if label}
		<span class="label">{label}</span>
	{/if}
</label>

<style>
	.checkbox-container {
		width: var(--size);
		height: var(--size);
		position: relative;
		background-color: var(--color-container-high);
		border-radius: 2px;
		cursor: pointer;

		&.faded {
			background-color: var(--color-container-high);
		}

		input[type='checkbox'] {
			width: var(--size);
			height: var(--size);
			opacity: 0;
		}

		&.md {
			--size: 20px;
		}

		&.lg {
			--size: 28px;
		}
	}

	.checkmark {
		position: absolute;
		inset: 0;
		display: grid;
		place-items: center;
		z-index: 2;
	}
</style>
