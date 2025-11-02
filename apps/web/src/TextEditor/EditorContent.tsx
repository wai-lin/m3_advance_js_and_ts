import type { Editor } from "@tiptap/core";
import type { Accessor, Component } from "solid-js";
import type { JSX } from "solid-js/jsx-runtime";
import { cn } from "#utils/cn";

type Props = Pick<JSX.HTMLAttributes<HTMLDivElement>, "ref" | "children"> & {
	defaultEditor: Accessor<Editor | undefined>;
};
export const EditorContent: Component<Props> = (props) => {
	return (
		<div
			class={cn(
				"relative mx-auto w-full max-w-(--editor-width) overflow-hidden",
				"px-4 pt-4 pb-16",
				"rounded-md border border-neutral/20 bg-white",
			)}
		>
			<div
				ref={props.ref}
				tabIndex={0}
				class={cn(
					"min-h-20 cursor-text",
					// eslint-disable-next-line better-tailwindcss/no-unregistered-classes
					"editor-content",
				)}
				onClick={() => props.defaultEditor()?.chain().focus().run()}
				onFocus={() => props.defaultEditor()?.chain().focus().run()}
			/>
			{props.children}
		</div>
	);
};
