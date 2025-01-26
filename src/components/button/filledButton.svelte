<script lang="ts">
	import { initGoogleLogin } from '../../states/auth.state.svelte';
	import Spinner from '../spinner.svelte';

	let {
		children,
		block,
		size,
		loading,
		...rest
	}: {
		children?: any;
		block?: boolean;
		size?: 'md' | 'lg' | 'sm';
		loading?: boolean;
		[key: string]: any;
	} = $props();
</script>

<button {...rest} class:block class={size}>
	{#if loading}
		<Spinner size="sm" dark />
	{:else}
		{@render children?.()}
	{/if}
</button>

<style lang="scss">
	button {
		background-color: var(--color-text);
		color: var(--color-surface);
		border: none;
		border-radius: 4px;
		padding: 10px 16px;
		font-size: 16px;
		font-weight: 600;
		letter-spacing: 0.01em;
		cursor: pointer;
		transition: background-color 0.2s ease-in-out;

		display: grid;
		place-items: center;

		&.block {
			width: 100%;
		}

		&:hover {
			background-color: var(--color-text-low);
		}

		&.lg {
			padding: 12px 16px;
		}

		&.sm {
			padding: 8px 16px;
			font-size: 13px;
		}
	}
</style>
