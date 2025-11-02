import type { UseQueryResult } from "@tanstack/solid-query";
import type { Component, ParentComponent } from "solid-js";
import { Match, Switch } from "solid-js";
import { Heading } from "./Heading";

interface Props {
	loading?: Component;
	error?: Component;
	resource: UseQueryResult<unknown>;
}

export const ShowResource: ParentComponent<Props> = (props) => {
	return (
		<Switch>
			<Match when={props.resource.isPending && props.loading}>
				{props.loading}
			</Match>

			<Match when={props.resource.isPending && !props.loading}>
				<Heading as="h4">Loading...</Heading>
			</Match>

			<Match when={props.resource.isError && props.error}>
				{props.error}
			</Match>

			<Match when={props.resource.isError && !props.error}>
				<div class="card bg-base-100 shadow-sm">
					<div class="card-body">
						<h3 class="card-title">Error</h3>
						<div>{props.resource.error?.message}</div>
					</div>
				</div>
			</Match>

			<Match when={props.resource.data}>
				{props.children}
			</Match>
		</Switch>
	);
};
