import type * as z from "zod/v4/core";

export { };

declare global {
	type InferZod<
		Schema extends z.$ZodType,
	> = Schema extends z.$ZodType
		? z.infer<Schema>
		: Schema;

	type InferEachZod<
		Type extends object,
		Key extends keyof Type = keyof Type,
	> = {
		[K in Key]: InferZod<Type[K]>;
	};

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
