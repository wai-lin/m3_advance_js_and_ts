import type { Component } from "solid-js";
import { For } from "solid-js";

export const Index: Component = () => {
	const query = useQuery(() => rpc.blogs.list.queryOptions());

	return (
		<div>
			<ol class="list-decimal p-6">
				<For each={query.data}>
					{blog => <li>{blog}</li>}
				</For>
			</ol>
		</div>
	);
};
