import type { Component } from "solid-js";
import type { Query } from "./composables";
import { useQuery } from "@tanstack/solid-query";
import { createSignal, For } from "solid-js";
import { Container, Heading, Main, ShowResource } from "../Components";
import { BlogCard } from "./BlogCard";
import { fetchBlogList } from "./composables";

export const BlogList: Component = () => {
	const [query] = createSignal<Query>({});
	const blogsList = useQuery(() => ({
		queryKey: ["blogs", query()],
		queryFn: () => fetchBlogList(query()),
	}));

	return (
		<Main>
			<Container as="section" class="relative pt-30">
				<div class="fixed top-0 z-10 w-full bg-base-200 px-4 pt-10 pb-5">
					<Heading>Blogs</Heading>
				</div>

				<div class="space-y-6 px-4 pb-40">
					<ShowResource resource={blogsList}>
						<For each={blogsList.data?.data}>
							{blog => (
								<BlogCard
									slug={blog.slug}
									title={blog.title}
									createdAt={blog.createdAt}
								/>
							)}
						</For>
					</ShowResource>
				</div>
			</Container>
		</Main>
	);
};
