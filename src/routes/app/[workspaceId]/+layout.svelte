<script lang="ts">
	import { onMount } from 'svelte';
	import Nav from '../../../components/nav/nav.svelte';
	import { navState$ } from '../../../components/nav/nav.state.svelte';

	let { children } = $props();
</script>

<Nav />
{@render children?.()}
