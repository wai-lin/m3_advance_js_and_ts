import { api } from "#utils/api";

export async function fetchBlogBySlug(slug: string) {
	return await api.get("/blogs/:blog", {
		param: { blog: slug },
		query: { type: "slug" },
	});
}
