/**
 * Calculates pagination metadata for a given query, total count, and data array.
 *
 * @template Query - Query object type that must contain limit and offset properties
 * @template Data - Array type for the data being paginated
 * @param query
 * @param count
 * @param data
 */
export function paginate<
	Query extends { limit: number; offset: number },
	Data extends unknown[],
>(query: Query, count: number, data: Data) {
	const limit = query.limit;
	const offset = query.offset;
	const currentPage = Math.floor(query.offset / query.limit) + 1;
	const totalPages = Math.ceil(count / query.limit);
	const totalCount = count;
	const hasNextPage = currentPage < totalPages;
	const hasPrevPage = currentPage > 1;

	return {
		data,
		meta: {
			limit,
			offset,
			currentPage,
			totalPages,
			totalCount,
			hasNextPage,
			hasPrevPage,
		},
	};
}
