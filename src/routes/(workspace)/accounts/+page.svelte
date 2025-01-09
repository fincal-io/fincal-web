<script lang="ts">
	import type { BreadcrumbItem } from '../../../components/breadcrumb.svelte';
	import IconButton from '../../../components/button/iconButton.svelte';
	import Header from '../../../components/header.svelte';
	import TableCell from '../../../components/table/table-cell.svelte';
	import TableRow from '../../../components/table/table-row.svelte';
	import Table from '../../../components/table/table.svelte';
	import AddIcon from '../../../icons/addIcon.svelte';

	import { goto } from '$app/navigation';

	const breadcrumbs: BreadcrumbItem[] = [
		{
			name: 'Home',
			href: '/'
		},
		{
			name: 'Accounts',
			href: '/accounts'
		}
	];

	const edit = (id = 'new') => {
		goto(`/accounts/new`);
	};
</script>

<Header {breadcrumbs}>
	<IconButton onclick={() => edit()}>
		<AddIcon />
	</IconButton>
</Header>

<div class="content">
	<Table>
		<TableRow>
			<TableCell max>ICICI Bank</TableCell>
			<TableCell>
				<p class="user">Reez P.</p>
			</TableCell>
			<TableCell end>
				<p class="price">$122K</p>
			</TableCell>
		</TableRow>
		<TableRow>
			<TableCell max>ICICI Bank</TableCell>
			<TableCell>
				<p class="user">Reez P.</p>
			</TableCell>
			<TableCell end>
				<p class="price">$122K</p>
			</TableCell>
		</TableRow>
		<TableRow>
			<TableCell max>ICICI Bank</TableCell>
			<TableCell>
				<p class="user">Reez P.</p>
			</TableCell>
			<TableCell end>
				<p class="price">$122K</p>
			</TableCell>
		</TableRow>
		<TableRow>
			<TableCell max>ICICI Bank</TableCell>
			<TableCell>
				<p class="user">Reez P.</p>
			</TableCell>
			<TableCell end>
				<p class="price">$122K</p>
			</TableCell>
		</TableRow>
	</Table>
</div>

<style lang="scss">
	.content {
		padding: 6px 8px 6px 10px;

		.price {
			color: var(--md-primary);
			font-weight: 600;
			font-size: 12px;
			letter-spacing: 0.01em;
		}

		.user {
			font-size: 12px;
			color: var(--md-on-surface-variant);
		}
	}
</style>
