export function getFormEntries(formData: FormData) {
	return Object.fromEntries(formData.entries());
}
