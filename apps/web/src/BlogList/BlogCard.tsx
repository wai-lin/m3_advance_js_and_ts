import type { Component } from "solid-js";
import { formatDate } from "#utils/date-format";
import { A } from "@solidjs/router";

interface Props {
	slug: string;
	title: string;
	createdAt: Date | string;
}

export const BlogCard: Component<Props> = (props) => {
	return (
		<A href={`/${props.slug}`} class="block">
			<div class="card bg-base-100 shadow-sm">
				<div class="card-body">
					<h3 class="card-title">{props.title}</h3>
					<p class="text-sm text-stone-500">
						{formatDate(props.createdAt)}
					</p>
				</div>
			</div>
		</A>
	);
};
