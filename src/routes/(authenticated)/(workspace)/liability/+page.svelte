<script lang="ts">
	import { goto } from '$app/navigation';
	import IconButton from '../../../../components/button/iconButton.svelte';
	import Header from '../../../../components/header.svelte';
	import AddIcon from '../../../../icons/addIcon.svelte';

	const edit = (id = 'new') => {
		goto(`/liability/${id}`);
	};
</script>

<Header title="Liabilities">
	<IconButton onclick={() => edit()}>
		<AddIcon />
	</IconButton>
</Header>
