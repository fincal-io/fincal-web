<script lang="ts">
	import FormGroup from '../../components/form/form-group.svelte';
	import SimpleInput from '../../components/form/simple-input.svelte';
	import type { FormElementProp } from '../form.svelte';

	let { value$, control, setValue }: FormElementProp = $props();
</script>

<FormGroup label={control.attributes?.name}>
	<SimpleInput placeholder={control.attributes?.placeholder} value={value$} {setValue} />

	{#if control.attributes?.hint}
		{@render control.attributes?.hint()}
	{/if}
</FormGroup>
