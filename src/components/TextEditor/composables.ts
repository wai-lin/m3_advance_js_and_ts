import type { Editor } from "@tiptap/core";
import type { Accessor } from "solid-js";

function getEditorState(editor?: Accessor<Editor>) {
	if (!editor)
		return undefined;

	return {
		canUndo: editor().can().chain().undo().run() ?? false,
		canRedo: editor().can().chain().redo().run() ?? false,

		isBold: editor().isActive("bold") ?? false,
		isItalic: editor().isActive("italic") ?? false,
		isUnderline: editor().isActive("underline") ?? false,
		isStrikethrough: editor().isActive("strike") ?? false,

		isH1: editor()?.isActive("heading", { level: 1 }) ?? false,
		isH2: editor()?.isActive("heading", { level: 2 }) ?? false,
		isH3: editor()?.isActive("heading", { level: 3 }) ?? false,

		isBulletList: editor()?.isActive("bulletList") ?? false,
		isOrderedList: editor()?.isActive("orderedList") ?? false,
	};
}

export function useEditorState(editor?: Accessor<Editor>) {
	const [editorState, setEditorState] = createSignal(getEditorState(editor));

	createEffect(() => {
		if (!editor)
			return;

		const editorInstance = editor();
		if (!editorInstance)
			return;

		const updateState = () => setEditorState(getEditorState(editor));

		editorInstance.on("transaction", updateState);
		editorInstance.on("selectionUpdate", updateState);

		onCleanup(() => {
			editorInstance.off("transaction", updateState);
			editorInstance.off("selectionUpdate", updateState);
		});
	});

	return editorState;
}
