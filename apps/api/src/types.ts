import type * as Blog from "./blogs/index.js";

declare global {
	interface WithPagination<Data> {
		data: Data;
		meta: {
			limit: number;
			offset: number;
			currentPage: number;
			totalPages: number;
			totalCount: number;
			hasNextPage: boolean;
			hasPrevPage: boolean;
		};
	}
}

export namespace API {
	export type Method = "GET" | "POST" | "PUT" | "PATCH" | "DELETE";

	export interface All {
		GET: Blog.GET;
		POST: Blog.POST;
		PUT: Blog.PUT;
		PATCH: Blog.PATCH;
		DELETE: Blog.DELETE;
	}

	export type ExtractType<
		M extends Method,
		P extends keyof All[M],
	> = All[M][P];
}
