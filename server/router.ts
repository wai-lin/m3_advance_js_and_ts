import { os } from "@orpc/server";

const listBlogs = os
	.handler(() => {
		return ["Hello", "World", "Foo", "Bar", "Baz"];
	});

export const router = {
	blogs: {
		list: listBlogs,
	},
};
