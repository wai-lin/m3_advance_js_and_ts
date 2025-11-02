import { api } from "#utils/api";

export async function fetchBlogBySlug(slug: string) {
	return await api.get("/blogs/:blog", {
		param: { blog: slug },
		query: { type: "slug" },
	});
}

export async function fetchDestoryBlog(blog: string) {
	return await api.delete("/blogs/:blog", {
		param: { blog },
	});
}
