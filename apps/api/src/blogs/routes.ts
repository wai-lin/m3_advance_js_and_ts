import { paginate } from "#utils/paginate";
import { zValidator } from "@hono/zod-validator";
import { Hono } from "hono";
import dtos from "./dtos.js";
import services from "./services.js";

export const routes = new Hono()
	.get(
		"/",
		zValidator("query", dtos.index.query),
		async (c) => {
			const query = c.req.valid("query");
			const blogs = await services.index({ query });
			return c.json(paginate(query, ...blogs));
		},
	)
	.get(
		"/:blog",
		zValidator("param", dtos.show.param),
		zValidator("query", dtos.show.query),
		async (c) => {
			const param = c.req.valid("param");
			const query = c.req.valid("query");
			const blog = await services.show({ param, query });
			return c.json({ data: blog });
		},
	)
	.post(
		"/",
		zValidator("json", dtos.store.json),
		async (c) => {
			const json = c.req.valid("json");
			const blog = await services.store({ json });
			return c.json({ data: blog });
		},
	)
	.on(
		["PUT", "PATCH"],
		"/:blog",
		zValidator("param", dtos.update.param),
		zValidator("json", dtos.update.json),
		async (c) => {
			const param = c.req.valid("param");
			const json = c.req.valid("json");
			const blog = await services.update({ param, json });
			return c.json({ data: blog });
		},
	)
	.delete(
		"/:blog",
		zValidator("param", dtos.destroy.param),
		async (c) => {
			const param = c.req.valid("param");
			const blog = await services.destroy({ param });
			return c.json({ data: blog });
		},
	);
