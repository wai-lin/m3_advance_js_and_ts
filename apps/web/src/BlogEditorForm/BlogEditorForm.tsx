import type { ClassValue } from "clsx";
import type { ParentComponent } from "solid-js";
import type { FormOnSubmit } from "../Components";
import { Form, FormField } from "../Components";
import { TextEditor } from "../TextEditor";

interface Props {
	id?: string;
	class?: ClassValue[] | string;
	onSubmit?: FormOnSubmit;
}
export const BlogEditorForm: ParentComponent<Props> = (props) => {
	return (
		<Form id={props.id} onSubmit={props.onSubmit} class={props.class}>
			<FormField for="title" label="Title:" required>
				<input required id="title" name="title" type="text" class="input w-full" />
			</FormField>

			<FormField for="slug" label="Slug:">
				<input id="slug" name="slug" type="text" class="input w-full" />
			</FormField>

			<FormField for="content" label="Content:" required>
				<TextEditor name="content" />
			</FormField>

			{props.children}
		</Form>
	);
};
