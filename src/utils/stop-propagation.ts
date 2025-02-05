export function stopPropagation(node: HTMLElement) {
	const handler = (e: MouseEvent) => {
		e.preventDefault();
		e.stopPropagation();
	};

	node.addEventListener('click', handler, true);

	return {
		destroy() {
			document.removeEventListener('click', handler, true);
		}
	};
}
