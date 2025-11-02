import type { Component } from "solid-js";
import { cn } from "#utils/cn";
import { getFormEntries } from "#utils/form";
import { A, useNavigate } from "@solidjs/router";
import { useMutation } from "@tanstack/solid-query";
import { Match, Switch } from "solid-js";
import { BlogEditorForm, formSchema } from "../BlogEditorForm";
import { Container, Heading, Main } from "../Components";
import { fetchCreateBlog } from "./composables";

export const BlogCreateForm: Component = () => {
	const navigate = useNavigate();
	const createBlog = useMutation(() => ({
		mutationFn: fetchCreateBlog,
		onSuccess: () => navigate("/"),
	}));

	function handleSubmit(formData: FormData) {
		const entries = getFormEntries(formData);
		const data = formSchema.parse(entries);
		createBlog.mutate(data);
	}

	return (
		<Main>
			<Container>
				<header class="flex items-center justify-between gap-10 py-5">
					<div class="flex items-center gap-6">
						<A href="/" class="btn btn-square" title="Go to Home">
							<i class="iconify lucide--home" />
						</A>

						<Heading>Create Blog</Heading>
					</div>

					<div>
						<button
							type="submit"
							form="blog-create-form"
							class={cn(
								"btn btn-primary",
								{ "btn-disabled": createBlog.isPending },
							)}
							disabled={createBlog.isPending}
						>
							<Switch>
								<Match when={createBlog.isPending}>
									<i class={cn("iconify lucide--loader", "animate-spin")} />
								</Match>
								<Match when={!createBlog.isPending}>
									<span>Save</span>
								</Match>
							</Switch>
						</button>
					</div>
				</header>

				<BlogEditorForm id="blog-create-form" onSubmit={handleSubmit} />
			</Container>
		</Main>
	);
};
