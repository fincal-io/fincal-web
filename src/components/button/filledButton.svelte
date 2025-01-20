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
		size?: 'md' | 'lg';
		loading?: boolean;
		[key: string]: any;
	} = $props();
</script>

<button {...rest} class:block class={size}>
	{#if loading}
		<Spinner size="sm" />
	{:else}
		{@render children?.()}
	{/if}
</button>

<style lang="scss">
	button {
		background-color: var(--md-primary-container);
		color: var(--md-on-primary-container);
		border: none;
		border-radius: 4px;
		padding: 10px 16px;
		font-size: 14px;
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
			background-color: var(--md-on-primary);
		}

		&.lg {
			padding: 12px 16px;
		}
	}
</style>
