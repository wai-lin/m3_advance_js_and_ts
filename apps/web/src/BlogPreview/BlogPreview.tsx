import type { Component } from "solid-js";
import { formatDate } from "#utils/date-format";
import { useParams } from "@solidjs/router";
import { useQuery } from "@tanstack/solid-query";
import { Show } from "solid-js";
import { Container, GoToHomeButton, Heading, Main, ShowResource } from "../Components";
import { EditorPreviewHTML } from "../TextEditor";
import { fetchBlogBySlug } from "./composables";

export const BlogPreview: Component = () => {
	const params = useParams <{ blog: string }>();
	const blog = useQuery(() => ({
		queryKey: ["blog", params.blog],
		queryFn: () => fetchBlogBySlug(params.blog),
	}));

	return (
		<Main>
			<Container class="pt-10">
				<Show when={!blog.data}>
					<GoToHomeButton />
				</Show>

				<ShowResource resource={blog}>
					<Show when={blog.data}>
						{blog => (
							<>
								<div class="mb-10">
									<div class="flex items-center gap-8">
										<GoToHomeButton />

										<div>
											<Heading>{blog().data?.title}</Heading>
											<p class="text-sm text-stone-500">
												{formatDate(blog().data?.updatedAt)}
											</p>
										</div>
									</div>
								</div>

								<EditorPreviewHTML content={blog().data?.contentHtml} />
							</>
						)}
					</Show>
				</ShowResource>
			</Container>
		</Main>
	);
};
