<script lang="ts">
	import Nav from '../../components/nav/nav.svelte';

	let { children } = $props();
</script>

<Nav />
{@render children?.()}
