import { mount, unmount } from 'svelte';
import type { components } from '../../api/fincal';
import Add from './add.svelte';

export const addNewEntity = async (initialValue: components['schemas']['entity_entity'] | null) => {
	return new Promise<string | null>((resolve) => {
		const component = mount(Add, {
			target: document.body,
			props: {
				initialValue,
				close: () => {
					resolve(null);
					unmount(component);
				},
				onSuccess: (value: string) => {
					resolve(value);
					unmount(component);
				}
			}
		});
	});
};
