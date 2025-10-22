import type { Editor } from "@tiptap/core";
import type { Accessor, Component } from "solid-js";
import type { JSX } from "solid-js/jsx-runtime";

type Props = Pick<JSX.HTMLAttributes<HTMLDivElement>, "ref" | "children"> & {
	defaultEditor: Accessor<Editor | undefined>;
};
export const EditorContent: Component<Props> = (props) => {
	return (
		<div
			class={cn(
				"relative mx-auto w-full max-w-(--editor-width) overflow-hidden",
				"px-4 pt-4 pb-16",
				"rounded border border-stone-200 bg-white",
			)}
		>
			{props.children}
			<div
				ref={props.ref}
				// eslint-disable-next-line better-tailwindcss/no-unregistered-classes
				class="editor-content min-h-20 cursor-text"
				onClick={() => props.defaultEditor()?.chain().focus().run()}
			/>
		</div>
	);
};
