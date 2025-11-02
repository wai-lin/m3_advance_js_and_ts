import type { API } from "@editor/api/types";
import { api } from "#utils/api";

export type Data = API.ExtractType<"POST", "/blogs">["json"];

export async function fetchCreateBlog(data: Data) {
	return await api.post("/blogs", { json: data });
}
