import type { API } from "@editor/api/types";
import type { FetchOptions } from "ofetch";
import { ofetch } from "ofetch";

type ExtractResponse<T> = T extends { response: infer R } ? R : never;
type ExtractOptions<T> = Omit<T, "response">;

function makeFetch<Method extends API.Method>(method: Method) {
	function f<Path extends keyof API.All[Method]>(
		path: Path,
		options: ExtractOptions<API.All[Method][Path]> & FetchOptions,
	): Promise<ExtractResponse<API.All[Method][Path]>>;

	function f<Path extends keyof API.All[Method]>(
		path: Path,
		options?: FetchOptions,
	): Promise<ExtractResponse<API.All[Method][Path]>> {
		const { param, query, body, json, ...rest } = (options || {}) as any;

		const baseURL = import.meta.env.VITE_API_URL;
		let url = path as string;

		if (param) {
			for (const [key, value] of Object.entries(param)) {
				url = url.replace(`:${key}`, String(value));
			}
		}

		return ofetch<ExtractResponse<API.All[Method][Path]>>(url, {
			baseURL,
			method,
			query,
			body: body || json,
			...rest,
		});
	}

	return f;
}

export const api = {
	get: makeFetch("GET"),
	post: makeFetch("POST"),
	put: makeFetch("PUT"),
	patch: makeFetch("PATCH"),
	delete: makeFetch("DELETE"),
};
