import type { Component, ParentComponent, Resource } from "solid-js";
import { Match, Switch } from "solid-js";
import { Heading } from "./Heading";

interface Props {
	loading?: Component;
	error?: Component;
	resource: Resource<unknown>;
}

export const ShowResource: ParentComponent<Props> = (props) => {
	return (
		<Switch>
			<Match when={props.resource.loading && props.loading}>
				{props.loading}
			</Match>

			<Match when={props.resource.loading && !props.loading}>
				<Heading as="h4">Loading...</Heading>
			</Match>

			<Match when={props.resource.error && props.error}>
				{props.error}
			</Match>

			<Match when={props.resource.error && !props.error}>
				<div class="card bg-base-100 shadow-sm">
					<div class="card-body">
						<h3 class="card-title">Error</h3>
						<div>{props.resource.error}</div>
					</div>
				</div>
			</Match>

			<Match when={props.resource()}>
				{props.children}
			</Match>
		</Switch>
	);
};
