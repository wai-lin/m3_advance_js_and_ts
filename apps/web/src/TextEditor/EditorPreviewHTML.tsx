import type { Component } from "solid-js";

interface Props {
	content?: string | null;
}
export const EditorPreviewHTML: Component<Props> = (props) => {
	return (
		<div
			// eslint-disable-next-line better-tailwindcss/no-unregistered-classes
			class="editor-content"
			// eslint-disable-next-line solid/no-innerhtml
			innerHTML={props.content ?? ""}
		/>
	);
};
