<script lang="ts">
	import { onMount } from 'svelte';
	import Nav from '../../../components/nav/nav.svelte';
	import Spinner from '../../../components/spinner.svelte';
	import { initWorkspace, workspaceState$ } from '../../../states/workspace.state.svelte';

	let { children } = $props();

	onMount(async () => {
		await initWorkspace();
	});
</script>

{#if workspaceState$.loaded}
	<Nav />
	{@render children?.()}
{:else}
	<div class="center">
		<Spinner />
	</div>
{/if}

<style lang="scss">
	.center {
		min-height: 100dvh;
		min-width: 100dvw;

		display: grid;
		place-items: center;
	}
</style>
