import type { JSX, ParentComponent } from "solid-js";
import { cn } from "#utils/cn";
import { mergeProps, splitProps } from "solid-js";
import { Dynamic } from "solid-js/web";

type Props = JSX.HTMLAttributes<HTMLDivElement> & {
	as?: string;
};

export const Container: ParentComponent<Props> = (props) => {
	const finalProps = mergeProps({ as: "div" }, props);
	const [local, rest] = splitProps(finalProps, ["as"]);

	return (
		<Dynamic
			component={local.as}
			{...rest}
			class={cn("mx-auto w-full max-w-3xl", rest.class)}
		/>
	);
};
