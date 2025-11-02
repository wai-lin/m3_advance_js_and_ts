import type { Component, JSX } from "solid-js";
import { cn } from "#utils/cn";
import { createMemo, mergeProps, splitProps } from "solid-js";
import { Dynamic } from "solid-js/web";

const sizeStyles = {
	h1: "text-3xl",
	h2: "text-xl",
	h3: "text-lg",
	h4: "text-base",
	h5: "text-sm",
	h6: "text-xs",
};

type Props = JSX.HTMLAttributes<HTMLHeadingElement> & {
	as?: "h1" | "h2" | "h3" | "h4" | "h5" | "h6";
};
export const Heading: Component<Props> = (props) => {
	const finalProps = mergeProps({ as: "h1" }, props);
	const [local, rest] = splitProps(finalProps, ["as", "class"]);
	const style = createMemo(() => sizeStyles[local.as as never]);

	return (
		<Dynamic
			component={local.as}
			{...rest}
			class={cn(style(), "font-bold", local.class)}
		/>
	);
};
