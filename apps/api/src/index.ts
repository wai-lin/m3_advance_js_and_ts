import { serve } from "@hono/node-server";
import { Hono } from "hono";
import blogs from "./blogs/index.js";

const app = new Hono();

app.get("/", (c) => {
	return c.text("Hello Hono!");
});

app.route("/api/blogs", blogs);

serve({
	fetch: app.fetch,
	port: 3000,
}, (info) => {
	// eslint-disable-next-line no-console
	console.log(`Server is running on http://localhost:${info.port}`);
});
