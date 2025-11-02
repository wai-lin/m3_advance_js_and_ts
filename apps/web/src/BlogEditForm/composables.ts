import type { API } from "@editor/api/types";
import { api } from "#utils/api";

export type Param = API.ExtractType<"PUT", "/blogs/:blog">["param"];
export type Data = API.ExtractType<"PUT", "/blogs/:blog">["json"];

export async function fetchEditBlog({ param, data }: { param: Param; data: Data }) {
	return await api.put("/blogs/:blog", { param, json: data });
}

export async function fetchBlogBySlug(slug: string) {
	return await api.get("/blogs/:blog", {
		param: { blog: slug },
		query: { type: "slug" },
	});
}
