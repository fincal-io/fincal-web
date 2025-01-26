<script lang="ts">
	import NavIcon from '../icons/navIcon.svelte';
	import Breadcrumb, { type BreadcrumbItem } from './breadcrumb.svelte';
	import IconButton from './button/iconButton.svelte';
	import { navState$ } from './nav/nav.state.svelte';

	let {
		breadcrumbs = [],
		children,
		title = '',
		showNav = true
	}: {
		breadcrumbs?: BreadcrumbItem[];
		children?: any;
		title?: string;
		showNav?: boolean;
	} = $props();
</script>

<header>
	{#if showNav}
		<IconButton onclick={() => (navState$.open = true)}>
			<NavIcon></NavIcon>
		</IconButton>
	{:else}
		<div class="spacer"></div>
	{/if}

	<h1>{title}</h1>

	<!-- <div class="breadcrumb">
		<Breadcrumb items={breadcrumbs} />
	</div> -->

	<div class="actions">
		{@render children?.()}
	</div>
</header>

<style lang="scss">
	header {
		display: flex;
		align-items: center;
		justify-content: space-between;
		padding: 12px;

		gap: 12px;
		background-color: var(--color-surface-low);

		.spacer {
			width: 24px;
		}
	}

	.breadcrumb {
		flex: 1 1 auto;
		overflow: hidden;
	}

	.actions {
		flex: 0 0 auto;

		display: flex;
		align-items: center;
		gap: 4px;
	}

	h1 {
		font-size: 16px;
		font-weight: 500;
		letter-spacing: 0.02em;
	}
</style>
