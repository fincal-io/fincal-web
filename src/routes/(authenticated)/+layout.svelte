<script lang="ts">
	import { onMount } from 'svelte';
	import Spinner from '../../components/spinner.svelte';
	import { appState$, initApp } from '../../states/app.state.svelte';

	let { children } = $props();

	onMount(async () => {
		await initApp();
	});
</script>

{#if appState$.loaded}
	{@render children?.()}
{:else}
	<Spinner />
{/if}
