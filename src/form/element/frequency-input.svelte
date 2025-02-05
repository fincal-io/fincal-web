<script lang="ts">
	import FormGroup from '../../components/form/form-group.svelte';
	import FrequencyPicker from '../../components/form/frequency-picker.svelte';

	import type { FormElementProp } from '../form.svelte';

	let { value$, control, setValue }: FormElementProp = $props();
</script>

<FormGroup label={control.attributes?.name}>
	<FrequencyPicker value={value$} change={setValue} placeholder={control?.attributes?.placeholder}
	></FrequencyPicker>
</FormGroup>
