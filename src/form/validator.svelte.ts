/* eslint-disable @typescript-eslint/no-explicit-any */
import type { FormControl } from './form.svelte';

export type ValidatorDefaultOption = {
	control: FormControl;
};

export type Validator = (
	value: any,
	option: ValidatorDefaultOption
) => string | string[] | undefined | void | null;

export const Validators = {
	required: (value: any, option: ValidatorDefaultOption) => {
		if (value === undefined || value === null || value === '') {
			return `${option.control.attributes?.name ?? 'Field'} is required`;
		}
	}
};
