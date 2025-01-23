import type { Action } from 'svelte/action';
import { workspaceState$ } from '../states/workspace.state.svelte';

export const currencyFormatter: Action<
	HTMLElement,
	string | number | { amount: number; currency: string } | undefined
> = (node, option) => {
	$effect(() => {
		const currencyId =
			typeof option === 'object' && option.currency
				? option.currency
				: workspaceState$.workspace?.defaultCurrencyId;

		if (!currencyId) {
			return;
		}

		const currency = workspaceState$.currencies.find((c) => c.code === currencyId);

		if (!currency) {
			return;
		}

		const amount = Number(typeof option === 'object' ? option.amount : option);

		const formatter = new Intl.NumberFormat(currency.locale, {
			style: 'currency',
			currency: currency.code,
			currencyDisplay: 'symbol',
			currencySign: 'standard'
		});

		node.innerHTML = formatter
			.format(amount)
			.replace(/([^\d.,\s])(\d)/, '$1 $2')
			.replace(/(\d)([^\d.,\s])$/, '$1 $2');
	});
};
