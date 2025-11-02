import type { Component } from "solid-js";
import { formatDate } from "#utils/date-format";
import { A, useNavigate, useParams } from "@solidjs/router";
import { useMutation, useQuery, useQueryClient } from "@tanstack/solid-query";
import { Show } from "solid-js";
import { Container, GoToHomeButton, Heading, Main, ShowResource } from "../Components";
import { EditorPreviewHTML } from "../TextEditor";
import { fetchBlogBySlug, fetchDestoryBlog } from "./composables";

export const BlogPreview: Component = () => {
	const params = useParams<{ blog: string }>();
	const navigate = useNavigate();
	const queryClient = useQueryClient();

	const blog = useQuery(() => ({
		queryKey: ["blog", params.blog],
		queryFn: () => fetchBlogBySlug(params.blog),
	}));

	const destoryBlog = useMutation(() => ({
		mutationFn: fetchDestoryBlog,
		onSuccess: () => {
			queryClient.invalidateQueries({ queryKey: ["blogs"] });
			queryClient.invalidateQueries({ queryKey: ["blog", params.blog] });
			navigate("/");
		},
	}));

	function handleDestory(id?: string) {
		if (!id) return;
		destoryBlog.mutate(id);
	}

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
								<div class="mb-10 flex items-center justify-between gap-10">
									<div class="flex items-center gap-8">
										<GoToHomeButton />

										<div>
											<Heading>{blog().data?.title}</Heading>
											<p class="text-sm text-stone-500">
												{formatDate(blog().data?.updatedAt)}
											</p>
										</div>
									</div>

									<div class="flex items-center gap-2">
										<A
											href={`/${blog().data?.slug}/edit`}
											title="Edit Blog"
											class="btn btn-square btn-outline btn-warning"
										>
											<i class="iconify lucide--pen" />
										</A>
										<button
											title="Delete Blog"
											class="btn btn-square btn-outline btn-error"
											onClick={() => handleDestory(blog().data?.id)}
										>
											<i class="iconify lucide--trash" />
										</button>
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
