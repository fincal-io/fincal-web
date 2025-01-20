<script lang="ts">
	import type { BreadcrumbItem } from '../../../../components/breadcrumb.svelte';
	import Header from '../../../../components/header.svelte';
	import { workspaceState$ } from '../../../../states/workspace.state.svelte';

	const breadcrumbs: BreadcrumbItem[] = [
		{
			name: workspaceState$.workspace?.name || 'Home',
			href: '/home'
		}
	];
</script>

<Header {breadcrumbs} />

<div class="content">
	<span class="ti ti-a-b"></span>
</div>
