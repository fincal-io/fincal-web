/* eslint-disable @typescript-eslint/no-explicit-any */
import type { Component } from 'svelte';
import type { Validator } from './validator.svelte';
import MoneyInput from './element/money-input.svelte';
import TextInput from './element/text-input.svelte';
import Emittery from 'emittery';
import IconInput from './element/icon-input.svelte';
import ColorInput from './element/color-input.svelte';
import SelectInput from './element/select-input.svelte';
import MultiSelectInput from './element/multi-select-input.svelte';

export type FormFieldDefinition = {
	type: string;
	defaultValue?: any;
	validators?: Validator[];
	attributes?: Record<string, any>;
};

const FormSymbol = Symbol('SVF_Form');

// export type FormDefinition = Record<string, FormFieldDefinition | FormControl>;

// export const createForm = (config: FormDefinition) => {
// 	const state$ = Object.entries(config).reduce(
// 		(acc, [key, config]) => {
// 			if ('_type' in config) {
// 				if (config._type === FormSymbol) {
// 					acc[key] = config;
// 					return acc;
// 				}
// 				throw new Error(`Invalid form control: ${key}`);
// 			}

// 			const { type, defaultValue, validators, attributes } = config;
// 			let value$ = $state(defaultValue);
// 			let touched$ = $state(false);
// 			let dirty$ = $state(false);

// 			// Use untrack to read value$ inside derived computations
// 			let valid = $derived.by(() =>
// 				untrack(() => validators?.every((validator) => validator(value$).valid) || true)
// 			);

// 			let errors = $derived.by(() =>
// 				untrack(() => validators?.flatMap((validator) => validator(value$).error || []) || [])
// 			);

// 			acc[key] = {
// 				value$,
// 				touched$,
// 				dirty$,
// 				valid,
// 				errors,
// 				attributes,
// 				type,
// 				_type: FormSymbol,
// 				controls: {},
// 				setValue: (value: any) => {
// 					value$ = value;
// 				}
// 			};

// 			return acc;
// 		},
// 		{} as Record<string, FormControl>
// 	);

// 	const value$ = $derived.by(() => {
// 		console.log('changing.. ', state$);

// 		Object.entries(state$).reduce(
// 			(acc, [key, control]) => {
// 				acc[key] = control.value$;
// 				return acc;
// 			},
// 			{} as Record<string, any>
// 		);
// 	});
// 	const controls = $derived(state$);
// 	const touched$ = $derived(Object.values(state$).every((control) => control.touched$));
// 	const dirty$ = $derived(Object.values(state$).every((control) => control.dirty$));
// 	const valid = $derived(Object.values(state$).every((control) => control.valid));
// 	const errors = $derived(Object.values(state$).flatMap((control) => control.errors));

// 	console.log({ controls });

// 	return {
// 		_type: FormSymbol,
// 		value$,
// 		controls,
// 		touched$,
// 		dirty$,
// 		valid,
// 		errors,
// 		type: 'form',
// 		attributes: {},
// 		setValue: (value: any) => {
// 			Object.values(state$).forEach((control) => {
// 				control.setValue(value);
// 			});
// 		}
// 	} as FormControl;
// };

export type FormControl = {
	type: string;
	attributes?: Record<string, any>;
	attributesBuilder?: (value: any) => Record<string, any>;
	validators?: Validator[];
	defaultValue?: any;
	unmanaged?: boolean;
};

export type FormDefinition = Record<string, FormControl>;

export const createForm = (config: FormDefinition) => {
	const emitter = new Emittery();

	return {
		type: FormSymbol,
		controls: Object.entries(config).reduce(
			(arr, e) => {
				arr.push({
					label: e[0],
					control: e[1]
				});

				return arr;
			},
			[] as { label: string; control: FormControl }[]
		),
		patchValue: (value: any) => {
			emitter.emit('patchValue', value);
		},
		listen: (event: 'patchValue', cb: (value: any) => void) => {
			emitter.on(event, cb);
		}
	};
};

export type FormElementProp = {
	control: FormControl;
	setValue: (value: any) => void;
	updateState: (cb: (source: any) => any) => void;
	form: {
		value$: any;
	};
	value$: any;
};

type FormElement = Component<FormElementProp>;

export const formElements: Record<string, FormElement> = {};

export const registerFormElement = (element: string, component: FormElement) => {
	if (formElements[element]) {
		throw new Error(`Form element ${element} already registered`);
	}

	formElements[element] = component;
};

registerFormElement('text', TextInput);
registerFormElement('money', MoneyInput);
registerFormElement('icon', IconInput);
registerFormElement('color', ColorInput);
registerFormElement('select', SelectInput);
registerFormElement('multi-select', MultiSelectInput);
