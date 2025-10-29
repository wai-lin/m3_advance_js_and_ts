import type { Editor } from "@tiptap/core";
import type { Accessor, Component } from "solid-js";
import { cn } from "#utils/cn";
import { useEditorState } from "./composables";

interface MenuButtonProps {
	title: string;
	isActive?: boolean;
	isDisabled?: boolean;
	class?: string;
	icon?: string;
	onClick?: () => void;
}
const MenuButton: Component<MenuButtonProps> = (props) => {
	return (
		<button
			type="button"
			title={props.title}
			disabled={props.isDisabled}
			onClick={() => props.onClick?.()}
			class={cn(
				"btn btn-square btn-sm",
				{ "btn-active btn-accent": props.isActive },
				props.class,
			)}
		>
			<i class={cn("iconify", props.icon)} />
		</button>
	);
};

interface Props {
	defaultEditor: Accessor<Editor>;
}
export const EditorMenu: Component<Props> = (props) => {
	const editorState = useEditorState(props.defaultEditor);

	return (
		<div
			class="absolute inset-x-0 bottom-0"
		>
			<div
				class={cn(
					"mx-auto w-full max-w-(--editor-width)",
					"overflow-x-auto px-4 py-2",
					"flex items-center gap-4",
					"border-t border-stone-200 bg-white",
				)}
			>
				<div class="join">
					<MenuButton
						title="Undo"
						isDisabled={!editorState()?.canUndo}
						class="join-item"
						icon="lucide--undo"
						onClick={() => props.defaultEditor().chain().focus().undo().run()}
					/>
					<MenuButton
						title="Redo"
						isDisabled={!editorState()?.canRedo}
						class="join-item"
						icon="lucide--redo"
						onClick={() => props.defaultEditor().chain().focus().redo().run()}
					/>
				</div>

				<div class="join">
					<MenuButton
						title="Bold"
						isActive={editorState()?.isBold}
						class="join-item"
						icon="lucide--bold"
						onClick={() => props.defaultEditor().chain().focus().toggleBold().run()}
					/>
					<MenuButton
						title="Italic"
						isActive={editorState()?.isItalic}
						class="join-item"
						icon="lucide--italic"
						onClick={() => props.defaultEditor().chain().focus().toggleItalic().run()}
					/>
					<MenuButton
						title="Underline"
						isActive={editorState()?.isUnderline}
						class="join-item"
						icon="lucide--underline"
						onClick={() => props.defaultEditor().chain().focus().toggleUnderline().run()}
					/>
					<MenuButton
						title="Strikethrough"
						isActive={editorState()?.isStrikethrough}
						class="join-item"
						icon="lucide--strikethrough"
						onClick={() => props.defaultEditor().chain().focus().toggleStrike().run()}
					/>
				</div>

				<div class="join">
					<MenuButton
						title="Heading 1"
						isActive={editorState()?.isH1}
						class="join-item"
						icon="lucide--heading-1"
						onClick={() => props.defaultEditor().chain().focus().toggleHeading({ level: 1 }).run()}
					/>
					<MenuButton
						title="Heading 2"
						isActive={editorState()?.isH2}
						class="join-item"
						icon="lucide--heading-2"
						onClick={() => props.defaultEditor().chain().focus().toggleHeading({ level: 2 }).run()}
					/>
					<MenuButton
						title="Heading 3"
						isActive={editorState()?.isH3}
						class="join-item"
						icon="lucide--heading-3"
						onClick={() => props.defaultEditor().chain().focus().toggleHeading({ level: 3 }).run()}
					/>
				</div>

				<div class="join">
					<MenuButton
						title="Bullet List"
						isActive={editorState()?.isBulletList}
						class="join-item"
						icon="lucide--list"
						onClick={() => props.defaultEditor().chain().focus().toggleBulletList().run()}
					/>
					<MenuButton
						title="Ordered List"
						isActive={editorState()?.isOrderedList}
						class="join-item"
						icon="lucide--list-ordered"
						onClick={() => props.defaultEditor().chain().focus().toggleOrderedList().run()}
					/>
				</div>

				<MenuButton
					title="Link Break"
					icon="lucide--minus"
					onClick={() => props.defaultEditor().chain().focus().setHorizontalRule().run()}
				/>
			</div>
		</div>
	);
};
