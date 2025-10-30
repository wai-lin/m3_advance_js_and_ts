import type { Blog } from "@prisma/client";

export interface GET {
	"/blogs": WithPagination<Blog[]>;
	"/blogs/:blog": { data: Blog | null };
}
export interface POST {
	"/blogs": { data: Blog };
}
export interface PUT {
	"/blogs/:blog": { data: Blog };
}
export interface PATCH {
	"/blogs/:blog": { data: Blog };
}
export interface DELETE {
	"/blogs/:blog": { data: Blog };
}
