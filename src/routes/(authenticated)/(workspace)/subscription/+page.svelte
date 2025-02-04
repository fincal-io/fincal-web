<script lang="ts">
	import { goto } from '$app/navigation';
	import type { BreadcrumbItem } from '../../../../components/breadcrumb.svelte';
	import IconButton from '../../../../components/button/iconButton.svelte';
	import Header from '../../../../components/header.svelte';
	import AddIcon from '../../../../icons/addIcon.svelte';

	const edit = (id = 'new') => {
		goto(`/subscription/${id}`);
	};
</script>

<Header title="Subscription">
	<IconButton onclick={() => edit()}>
		<AddIcon />
	</IconButton>
</Header>
