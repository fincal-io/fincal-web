<script lang="ts">
	import NavIcon from '../icons/navIcon.svelte';
	import Breadcrumb, { type BreadcrumbItem } from './breadcrumb.svelte';
	import IconButton from './button/iconButton.svelte';
	import { navState$ } from './nav/nav.state.svelte';

	let { breadcrumbs = [], children }: { breadcrumbs: BreadcrumbItem[]; children?: any } = $props();
</script>

<header>
	<IconButton onclick={() => (navState$.open = true)}>
		<NavIcon></NavIcon>
	</IconButton>

	<div class="breadcrumb">
		<Breadcrumb items={breadcrumbs} />
	</div>

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
		background-color: var(--md-surface-container-low);
	}

	.breadcrumb {
		flex: 1 1 auto;
		overflow: hidden;
	}

	.actions {
		flex: 0 0 auto;
	}
</style>
