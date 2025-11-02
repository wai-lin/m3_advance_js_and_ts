import type { ClassValue } from "clsx";
import type { ParentComponent } from "solid-js";
import type { FormOnSubmit } from "../Components";
import { Form, FormField } from "../Components";
import { TextEditor } from "../TextEditor";

interface FormValues {
	title: string;
	slug: string;
	content: string;
}

interface Props {
	id?: string;
	defaultValues?: FormValues;
	class?: ClassValue[] | string;
	onSubmit?: FormOnSubmit;
}
export const BlogEditorForm: ParentComponent<Props> = (props) => {
	return (
		<Form id={props.id} onSubmit={props.onSubmit} class={props.class}>
			<FormField for="title" label="Title:" required>
				<input
					required
					id="title"
					name="title"
					type="text"
					value={props.defaultValues?.title}
					class="input w-full"
				/>
			</FormField>

			<FormField for="slug" label="Slug:">
				<input
					id="slug"
					name="slug"
					type="text"
					value={props.defaultValues?.slug}
					class="input w-full"
				/>
			</FormField>

			<FormField label="Content:" required>
				<TextEditor
					name="content"
					defaultValue={props.defaultValues?.content}
				/>
			</FormField>

			{props.children}
		</Form>
	);
};
