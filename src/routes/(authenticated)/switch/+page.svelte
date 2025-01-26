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
	import Header from '../../../components/header.svelte';
	import AddIcon from '../../../icons/addIcon.svelte';
	import ArrowRightIcon from '../../../icons/arrowRightIcon.svelte';

	let workspaces$ = $state<components['schemas']['workspace_entity'][]>([]);

	onMount(async () => {
		const { data = [] } = await api.GET('/api/v1/workspaces/');
		workspaces$ = data;
	});

	const addWorkspace = () => {
		goto('/switch/add');
	};
</script>

<Header title="Switch Workspaces" showNav={false}>
	<IconButton onclick={() => addWorkspace()}>
		<AddIcon />
	</IconButton>
</Header>

<div class="content">
	<p class="content-title">Pick a workspace</p>
	{#each workspaces$ as workspace}
		<!-- svelte-ignore a11y_click_events_have_key_events -->
		<div
			class="workspace-list"
			role="button"
			tabindex="0"
			onclick={async () => {
				await switchWorkspace(workspace.id || '');
				goto('/home', { replaceState: true });
			}}
		>
			<div class="info">
				<p class="name">{workspace.name}</p>
				<p class="hint">Reez P. + 6 others</p>
			</div>

			<div class="switch">
				<ArrowRightIcon size={22} />
			</div>
		</div>
	{/each}
</div>

<style lang="scss">
	.content {
		.content-title {
			padding: 24px 24px 12px 24px;
			color: var(--color-text-lowest);
			font-weight: 500;
			font-size: 14px;
		}

		.workspace-list {
			padding: 16px;
			display: flex;
			align-items: center;
			gap: 12px;
			border-bottom: 1px solid var(--color-border);

			.info {
				flex: 1 1 auto;
				display: flex;
				flex-direction: column;
				gap: 4px;
				overflow: hidden;

				.name {
					font-size: 14px;
					font-weight: 600;
					text-wrap: nowrap;
					width: 100%;
					overflow: hidden;
					white-space: nowrap;
					text-overflow: ellipsis;
				}

				.hint {
					color: var(--color-text-lower);
					font-size: 12px;
					font-weight: 500;
					letter-spacing: 0.02em;
				}
			}

			.switch {
				flex: 0 0 auto;
				opacity: 0.6;
			}
		}
	}

	// .no-result {
	// 	display: flex;
	// 	align-items: center;
	// 	justify-content: center;
	// 	flex-direction: column;
	// 	gap: 20px;
	// 	padding: 36px 15px 54px;

	// 	p {
	// 		font-size: 15px;
	// 	}
	// }
</style>
