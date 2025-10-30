import type { Component } from "solid-js";
import type { Query } from "./composables";
import { createResource, createSignal, For } from "solid-js";
import { Container, Heading, ShowResource } from "../Components";
import { BlogCard } from "./BlogCard";
import { fetchBlogList } from "./composables";

export const BlogList: Component = () => {
	const [query] = createSignal<Query>({});
	const [blogs] = createResource(query, fetchBlogList);

	return (
		<main class="min-h-screen bg-base-200">
			<Container as="section" class="relative pt-30">
				<Heading class="fixed top-0 bg-base-200 pt-10 pb-5">
					Blogs
				</Heading>

				<div class="space-y-6">
					<ShowResource resource={blogs}>
						<For each={blogs()?.data}>
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
		</main>
	);
};
