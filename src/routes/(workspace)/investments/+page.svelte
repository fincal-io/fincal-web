<script lang="ts">
	import type { BreadcrumbItem } from '../../../components/breadcrumb.svelte';
	import Header from '../../../components/header.svelte';

	const breadcrumbs: BreadcrumbItem[] = [
		{
			name: 'Home',
			href: '/home'
		}
	];
</script>

<Header {breadcrumbs} />
