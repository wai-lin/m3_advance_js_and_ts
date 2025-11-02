import type { Component } from "solid-js";
import { debounce } from "@solid-primitives/scheduled";
import { Editor } from "@tiptap/core";
import StarterKit from "@tiptap/starter-kit";
import { createSignal, onCleanup, onMount, Show } from "solid-js";
import { EditorContent } from "./EditorContent";
import { EditorMenu } from "./EditorMenu";

interface Props {
	name?: string;
}
export const TextEditor: Component<Props> = (props) => {
	let editorEl!: HTMLDivElement;

	const [editor, setEditor] = createSignal<Editor>();
	const [html, setHtml] = createSignal("");
	const [json, setJson] = createSignal("");

	const updateContent = debounce((editor: Editor) => {
		setHtml(editor.getHTML());
		setJson(JSON.stringify(editor.getJSON()));
	}, 500);

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
			onUpdate: ({ editor }) => {
				updateContent(editor);
			},
		});

		setEditor(editorInstance);
	});
	onCleanup(() => {
		editor()?.destroy();
	});

	return (
		<div
			style={{ "--editor-width": "800px" }}
			class="relative"
		>
			<EditorContent ref={editorEl} defaultEditor={editor}>
				<Show when={editor()}>
					{editor => <EditorMenu defaultEditor={editor} />}
				</Show>
			</EditorContent>
			<input
				type="hidden"
				name={`${props.name}Html`}
				value={html()}
			/>
			<input
				type="hidden"
				name={`${props.name}`}
				value={json()}
			/>
		</div>
	);
};
