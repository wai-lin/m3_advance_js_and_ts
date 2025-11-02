import type { ParentComponent } from "solid-js";
import { QueryClient, QueryClientProvider } from "@tanstack/solid-query";
import { SolidQueryDevtools } from "@tanstack/solid-query-devtools";

const OneSecond = 1000;
const OneMinute = 60 * OneSecond;

export const queryClient = new QueryClient({
	defaultOptions: {
		queries: {
			retry: 3,
			staleTime: 5 * OneMinute,
			refetchOnWindowFocus: import.meta.env.PROD,
		},
	},
});

export const SetupQueryClient: ParentComponent = (props) => {
	return (
		<QueryClientProvider client={queryClient}>
			{props.children}
			<SolidQueryDevtools />
		</QueryClientProvider>
	);
};
