import type { Blog } from "@prisma/client";
import type * as z from "zod";
import type dtos from "./dtos.js";

export type Path = "/blogs" | "/blogs/:blog";

export interface GET {
	"/blogs": {
		query?: Partial<z.infer<typeof dtos.index.query>>;
		response: WithPagination<Blog[]>;
	};
	"/blogs/:blog": {
		param: z.infer<typeof dtos.show.param>;
		query?: Partial<z.infer<typeof dtos.show.query>>;
		response: { data: Blog | null };
	};
}

export interface POST {
	"/blogs": {
		json: z.infer<typeof dtos.store.json>;
		response: { data: Blog };
	};
}

export interface PUT {
	"/blogs/:blog": {
		param: z.infer<typeof dtos.update.param>;
		json: Partial<z.infer<typeof dtos.update.json>>;
		response: { data: Blog };
	};
}

export interface PATCH {
	"/blogs/:blog": {
		param: z.infer<typeof dtos.update.param>;
		json: Partial<z.infer<typeof dtos.update.json>>;
		response: { data: Blog };
	};
}

export interface DELETE {
	"/blogs/:blog": {
		param: z.infer<typeof dtos.destroy.param>;
		response: { data: Blog };
	};
}
