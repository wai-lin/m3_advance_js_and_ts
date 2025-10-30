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
	export interface GET extends Blog.GET {}
	export interface POST extends Blog.POST {}
	export interface PUT extends Blog.PUT {}
	export interface PATCH extends Blog.PATCH {}
	export interface DELETE extends Blog.DELETE {}
}
