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
	}

	let {
		checked = $bindable(false),
		label = '',
		disabled = false,
		name = '',
		value = '',
		required = false,
		faded = false
	}: Props = $props();
</script>

<label class="checkbox-container" class:disabled class:checked class:faded>
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
		width: 20px;
		height: 20px;
		position: relative;
		background-color: var(--md-surface-container-high);
		border-radius: 2px;
		cursor: pointer;

		&.faded {
			background-color: var(--md-surface-container-highest);
		}
	}

	.checkmark {
		position: absolute;
		inset: 0;
		display: grid;
		place-items: center;
		z-index: 2;
	}

	input[type='checkbox'] {
		width: 20px;
		height: 20px;
		opacity: 0;
	}
</style>
