import type { Component } from "solid-js";
import { A } from "@solidjs/router";

export const GoToHomeButton: Component = () => {
	return (
		<A href="/" end class="btn btn-square" title="Go to Home">
			<i class="iconify lucide--home" />
		</A>
	);
};
