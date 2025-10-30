import type { API } from "@editor/api/types";
import { api } from "#utils/api";

export type Query = API.ExtractType<"GET", "/blogs">["query"];

export async function fetchBlogList(query: Query) {
	return await api.get("/blogs", { query });
}
