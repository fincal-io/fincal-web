<script lang="ts">
	import { onMount } from 'svelte';
	import '../styles.scss';
	import { authState$, initAuth } from '../states/auth.state.svelte';
	import Spinner from '../components/spinner.svelte';

	let { children } = $props();

	onMount(() => {
		initAuth();
	});
</script>

<svelte:head>
	<title>Fincal</title>
	<description>Personal Wealth Management and Planner</description>
	<link rel="icon" href="%sveltekit.assets%/favicon.png" />
	<link rel="manifest" href="%sveltekit.assets%/manifest.json" />
</svelte:head>

{#if authState$.settled}
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
