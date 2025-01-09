type OutsideClickOptions = {
	enabled?: boolean;
	handler?: () => void;
	exclude?: (HTMLElement | null)[];
};

export function outsideClick(node: HTMLElement, options: OutsideClickOptions = {}) {
	const { enabled = true, handler = () => {}, exclude = [] } = options;

	const handleClick = (event: MouseEvent) => {
		if (!enabled) return;

		const target = event.target as Node;

		// Check if click was outside and not on excluded elements
		const isOutside = !node.contains(target);
		const isNotExcluded = !exclude.some((el) => el?.contains(target));

		if (isOutside && isNotExcluded) {
			handler();
		}
	};

	document.addEventListener('click', handleClick, true);

	return {
		destroy() {
			document.removeEventListener('click', handleClick, true);
		},
		update(newOptions: OutsideClickOptions) {
			options = { ...options, ...newOptions };
		}
	};
}
