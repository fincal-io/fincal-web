<script lang="ts">
	import { onMount } from 'svelte';
	import { goto } from '$app/navigation';
	import { api } from '../../../api/api';
	import type { components } from '../../../api/fincal';
	import IconButton from '../../../components/button/iconButton.svelte';
	import EmptyIcon from '../../../icons/emptyIcon.svelte';
	import PlusIcon from '../../../icons/plusIcon.svelte';
	import TextButton from '../../../components/button/textButton.svelte';
	import { switchWorkspace } from '../../../states/workspace.state.svelte';

	let workspaces$ = $state<components['schemas']['workspace_entity'][]>([]);

	onMount(async () => {
		const { data = [] } = await api.GET('/api/v1/workspaces/');
		workspaces$ = data;
	});

	const addWorkspace = () => {
		goto('/switch/add');
	};
</script>

<div class="container">
	<div class="card">
		<div class="add-wrapper">
			<h1>Select a workspace</h1>

			<IconButton onclick={addWorkspace}>
				<PlusIcon size={20} />
			</IconButton>
		</div>

		{#if workspaces$.length}
			<div class="workspace-list">
				{#each workspaces$ as workspace}
					<TextButton
						onclick={async () => {
							await switchWorkspace(workspace.id || '');
							goto('/home', { replaceState: true });
						}}
						block
						faded>{workspace.name}</TextButton
					>
				{/each}
			</div>
		{:else}
			<div class="no-result">
				<EmptyIcon size={42} />
				<p class="name">No workspace found</p>
			</div>
		{/if}
	</div>
</div>

<style lang="scss">
	.container {
		display: grid;
		place-items: center;

		min-height: 100vh;
		width: 100vw;

		padding: 24px;
	}

	.card {
		width: 100%;
		max-width: 420px;
		border: 1px solid var(--md-outline);
		border-radius: 8px;

		.add-wrapper {
			display: flex;
			justify-content: space-between;
			padding: 15px 15px 0 24px;
			align-items: center;

			h1 {
				font-size: 20px;
				font-weight: 500;
			}
		}
	}

	.no-result {
		display: flex;
		align-items: center;
		justify-content: center;
		flex-direction: column;
		gap: 20px;
		padding: 36px 15px 54px;

		p {
			font-size: 15px;
		}
	}

	.workspace-list {
		padding: 24px;
		display: flex;
		flex-direction: column;
		gap: 12px;
		max-height: 500px;
		overflow: hidden auto;

		button {
			background-color: transparent;
		}
	}
</style>
