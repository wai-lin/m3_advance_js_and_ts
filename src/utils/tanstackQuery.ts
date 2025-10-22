import { QueryClient, useMutation, useQuery } from "@tanstack/solid-query";

export { useMutation, useQuery };

export const queryClient = new QueryClient({
	defaultOptions: {
		queries: { retry: 3 },
	},
});
