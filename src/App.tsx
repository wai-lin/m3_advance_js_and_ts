import type { Component } from "solid-js";
import { QueryClientProvider } from "@tanstack/solid-query";
import { Index } from "./routes/index";
import { queryClient } from "./utils/tanstackQuery";

export const App: Component = () => {
	return (
		<QueryClientProvider client={queryClient}>
			<Router>
				<Route path="/" component={() => <Index />} />
			</Router>
		</QueryClientProvider>
	);
};
