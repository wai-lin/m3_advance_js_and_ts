import z from "zod";

const dtos = {
	index: {
		query: z.object({
			limit: z.number().min(1).max(100).default(10),
			offset: z.number().min(0).default(0),
			orderBy: z.enum(["title", "createdAt", "updatedAt"]).default("createdAt"),
			order: z.enum(["asc", "desc"]).default("desc"),
		}),
	},
	show: {
		param: z.object({
			blog: z.union([z.cuid(), z.string()]),
		}),
		query: z.object({
			type: z.enum(["id", "slug"]).default("id"),
		}),
	},
	store: {
		json: z.object({
			title: z.string().min(1).max(500),
			slug: z.string().min(1).max(500).optional(),
			content: z.string().optional(),
		}),
	},
	update: {
		param: z.object({
			blog: z.cuid(),
		}),
		json: z.object({
			title: z.string().min(1).max(500).optional(),
			slug: z.string().min(1).max(500).optional(),
			content: z.string().optional(),
		}),
	},
	destroy: {
		param: z.object({
			blog: z.cuid(),
		}),
	},
};
export default dtos;
