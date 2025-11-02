import type { Component } from "solid-js";
import { cn } from "#utils/cn";
import { getFormEntries } from "#utils/form";
import { useNavigate, useParams } from "@solidjs/router";
import { useMutation, useQuery, useQueryClient } from "@tanstack/solid-query";
import { createMemo, Match, Switch } from "solid-js";
import { BlogEditorForm, formSchema } from "../BlogEditorForm";
import { Container, GoToHomeButton, Heading, Main } from "../Components";
import { fetchBlogBySlug, fetchEditBlog } from "./composables";

export const BlogEditForm: Component = () => {
	const params = useParams<{ blog: string }>();
	const navigate = useNavigate();
	const queryClient = useQueryClient();

	const blog = useQuery(() => ({
		queryKey: ["blog", params.blog],
		queryFn: () => fetchBlogBySlug(params.blog),
	}));
	const editBlog = useMutation(() => ({
		mutationFn: fetchEditBlog,
		onSuccess: () => {
			queryClient.invalidateQueries({ queryKey: ["blog", params.blog] });
			navigate("/");
		},
	}));

	function handleSubmit(formData: FormData) {
		const entries = getFormEntries(formData);
		const data = formSchema.parse(entries);
		const blogId = blog.data?.data?.id;
		if (!blogId) return;
		editBlog.mutate({ data, param: { blog: blogId } });
	}

	const defaultValues = createMemo(() => ({
		title: blog.data?.data?.title ?? "",
		slug: blog.data?.data?.slug ?? "",
		content: blog.data?.data?.contentHtml ?? "",
	}));

	return (
		<Main>
			<Container>
				<header class="flex items-center justify-between gap-10 py-5">
					<div class="flex items-center gap-6">
						<GoToHomeButton />

						<Heading>Edit Blog</Heading>
					</div>

					<div>
						<button
							type="submit"
							form="blog-create-form"
							class={cn(
								"btn btn-primary",
								{ "btn-disabled": editBlog.isPending },
							)}
							disabled={editBlog.isPending}
						>
							<Switch>
								<Match when={editBlog.isPending}>
									<i class={cn("iconify lucide--loader", "animate-spin")} />
								</Match>
								<Match when={!editBlog.isPending}>
									<span>Save</span>
								</Match>
							</Switch>
						</button>
					</div>
				</header>

				<BlogEditorForm
					id="blog-create-form"
					defaultValues={defaultValues()}
					onSubmit={handleSubmit}
				/>
			</Container>
		</Main>
	);
};
