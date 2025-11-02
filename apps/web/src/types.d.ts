export { };

declare global {
	type FormEvent = SubmitEvent & {
		currentTarget: HTMLFormElement;
		target: DOMElement;
	};
}
