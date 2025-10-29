import type dtos from "./dtos.js";
import { db } from "#utils/db";

const services = {
	index: async (args: InferEachZod<typeof dtos.index>) => {
		const { query } = args;

		const count = await db.blog.count();
		const list = await db.blog.findMany({
			take: query.limit,
			skip: query.offset,
			orderBy: { [query.orderBy]: query.order },
		});
		return [count, list] as const;
	},
	show: async (args: InferEachZod<typeof dtos.show>) => {
		const { param, query } = args;

		const blog = await db.blog.findFirst({
			where: { [query.type]: param.blog },
		});
		return blog;
	},
	store: async (args: InferEachZod<typeof dtos.store>) => {
		const { json } = args;

		const blog = await db.blog.create({ data: json });
		return blog;
	},
	update: async (args: InferEachZod<typeof dtos.update>) => {
		const { param, json } = args;

		const blog = await db.blog.update({
			where: { id: param.blog },
			data: { ...json, updatedAt: new Date() },
		});
		return blog;
	},
	destroy: async (args: InferEachZod<typeof dtos.destroy>) => {
		const { param } = args;

		const blog = await db.blog.delete({
			where: { id: param.blog },
		});
		return blog;
	},
};

export default services;
