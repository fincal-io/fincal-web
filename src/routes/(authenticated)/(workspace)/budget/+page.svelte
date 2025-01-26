<script lang="ts">
	import { goto } from '$app/navigation';
	import type { BreadcrumbItem } from '../../../../components/breadcrumb.svelte';
	import Header from '../../../../components/header.svelte';
	import Menu, { type MenuOption } from '../../../../components/menu.svelte';

	const menuItems: MenuOption[] = [
		{
			id: 'edit',
			label: 'Edit template'
		}
	];

	const onSelect = (opt: MenuOption) => {
		switch (opt.id) {
			case 'edit':
				goto('/budget/template');
				break;
		}
	};
</script>

<Header title="Budget">
	<Menu options={menuItems} select={onSelect} />
</Header>
