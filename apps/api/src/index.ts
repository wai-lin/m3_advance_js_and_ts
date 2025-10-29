import { serve } from "@hono/node-server";
import { Hono } from "hono";
import { cors } from "hono/cors";
import blogs from "./blogs/index.js";

const app = new Hono();

app.use(cors());

app.get("/", c => c.text("Hello Hono!"));
app.route("/api/blogs", blogs);

serve({
	fetch: app.fetch,
	port: 3000,
}, (info) => {
	// eslint-disable-next-line no-console
	console.log(`Server is running on http://localhost:${info.port}`);
});
