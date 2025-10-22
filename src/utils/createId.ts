export function createId() {
	const timestamp = Date.now().toString(36);

	const alphabet = "ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789";
	const size = 10;

	const bytes = crypto.getRandomValues(new Uint8Array(size));
	let randomPart = "";

	for (let i = 0; i < size; i++) {
		randomPart += alphabet[bytes[i] % alphabet.length];
	}

	return `${timestamp}-${randomPart}`;
}
