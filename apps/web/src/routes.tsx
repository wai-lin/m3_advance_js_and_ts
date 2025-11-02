import type { Component } from "solid-js";
import { Route, Router } from "@solidjs/router";
import { lazy } from "solid-js";
import BlogList from "./BlogList";

export const Routes: Component = () => {
	return (
		<Router>
			<Route path="/" component={BlogList} />
			<Route path="/create" component={lazy(() => import("./BlogCreateForm"))} />
			<Route path="/:blog" component={lazy(() => import("./BlogPreview"))} />
			<Route path="/:blog/edit" component={lazy(() => import("./BlogEditForm"))} />
		</Router>
	);
};
