<script lang="ts">
	import ColorPicker from '../../components/form/color-picker.svelte';
	import FormGroup from '../../components/form/form-group.svelte';
	import IconPicker from '../../components/form/icon-picker.svelte';
	import SimpleInput from '../../components/form/simple-input.svelte';
	import type { FormElementProp } from '../form.svelte';

	let { value$, control, setValue }: FormElementProp = $props();
</script>

<FormGroup label={control.attributes?.name}>
	<ColorPicker value={value$} update={setValue} />
</FormGroup>
