import type { Component } from "solid-js";
import { Editor } from "@tiptap/core";
import StarterKit from "@tiptap/starter-kit";
import { createSignal, onCleanup, onMount, Show } from "solid-js";
import { EditorContent } from "./EditorContent";
import { EditorMenu } from "./EditorMenu";

export const TextEditor: Component = () => {
	let editorEl!: HTMLDivElement;
	const [editor, setEditor] = createSignal<Editor>();

	onMount(() => {
		const editorInstance = new Editor({
			element: editorEl,
			editorProps: {
				attributes: { class: "outline-none" },
			},
			extensions: [
				StarterKit.configure({
					heading: { levels: [1, 2, 3] },
				}),
			],
		});

		setEditor(editorInstance);
	});

	onCleanup(() => editor()?.destroy());

	return (
		<div
			style={{ "--editor-width": "800px" }}
			class="relative px-4 py-10"
		>
			<EditorContent ref={editorEl} defaultEditor={editor}>
				<Show when={editor()}>
					{editor => (<EditorMenu defaultEditor={editor} />)}
				</Show>
			</EditorContent>
		</div>
	);
};
