<script lang="ts">
	import FormGroup from '../../components/form/form-group.svelte';
	import SimpleSelect from '../../components/form/simple-select.svelte';

	import type { FormElementProp } from '../form.svelte';

	let { value$, control, setValue }: FormElementProp = $props();
</script>

<FormGroup label={control.attributes?.name}>
	<SimpleSelect
		value={value$}
		change={setValue}
		placeholder={control?.attributes?.placeholder}
		options={control.attributes?.options}
	></SimpleSelect>
</FormGroup>
