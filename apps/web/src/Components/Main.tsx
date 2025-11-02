import type { JSX, ParentComponent } from "solid-js";
import { cn } from "#utils/cn";

type Props = JSX.HTMLAttributes<HTMLElement>;
export const Main: ParentComponent<Props> = (props) => {
	return (
		<main
			{...props}
			class={cn("min-h-screen bg-base-200", props.class)}
		/>
	);
};
