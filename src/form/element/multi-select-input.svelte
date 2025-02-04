<script lang="ts">
	import DetailedSelect from '../../components/form/detailed-select.svelte';
	import FormGroup from '../../components/form/form-group.svelte';

	import type { FormElementProp } from '../form.svelte';

	let { value$, control, setValue }: FormElementProp = $props();
</script>

<FormGroup label={control.attributes?.name}>
	<DetailedSelect
		multi
		values={value$}
		change={setValue}
		placeholder={control?.attributes?.placeholder}
		options={control.attributes?.options}
	></DetailedSelect>
</FormGroup>
