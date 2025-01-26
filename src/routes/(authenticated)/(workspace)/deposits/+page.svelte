<script lang="ts">
	import BottomSheet from '../../../../components/bottom-sheet.svelte';
	import IconButton from '../../../../components/button/iconButton.svelte';
	import Header from '../../../../components/header.svelte';
	import SimpleList from '../../../../components/simple-list.svelte';
	import AddIcon from '../../../../icons/addIcon.svelte';

	let open$ = $state(false);

	const depositItems = [
		{
			name: 'Fixed Deposit',
			id: 'fixed',
			hint: 'Lumpsum Investment'
		},
		{
			name: 'Recurring Deposit',
			id: 'recurring',
			hint: 'Recurring Deposit'
		}
	];
</script>

<Header title="Deposits">
	<IconButton onclick={() => (open$ = true)}>
		<AddIcon />
	</IconButton>
</Header>

<BottomSheet open={open$} close={() => (open$ = false)}>
	<SimpleList
		items={depositItems}
		title="Select type of deposit"
		onClick={(item) => {
			console.log(item);
			open$ = false;
		}}
	/>
</BottomSheet>
