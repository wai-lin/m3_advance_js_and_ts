import { stringToJson } from "#utils/schema";
import z from "zod";

export const formSchema = z.object({
	title: z.string().min(2).max(500),
	slug: z.string().max(500).optional(),
	content: stringToJson,
	contentHtml: z.string().optional(),
});
