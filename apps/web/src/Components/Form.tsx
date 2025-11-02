import type { ClassValue } from "clsx";
import type { ParentComponent } from "solid-js";
import { cn } from "#utils/cn";
import { Show } from "solid-js";

interface FormProps {
	id?: string;
	class?: ClassValue[] | string;
	onSubmit?: (data: FormData) => void | Promise<void>;
}
export type FormOnSubmit = FormProps["onSubmit"];
export const Form: ParentComponent<FormProps> = (props) => {
	function submitHandler(e: FormEvent) {
		e.preventDefault();
		const formData = new FormData(e.currentTarget);
		props.onSubmit?.(formData);
	}

	return (
		<form
			id={props.id}
			onSubmit={submitHandler}
			class={cn(props.class)}
		>
			{props.children}
		</form>
	);
};

interface FormFieldProps {
	for?: string;
	label: string;
	required?: boolean;
	class?: string;
}
export const FormField: ParentComponent<FormFieldProps> = (props) => {
	return (
		<fieldset class={cn("fieldset w-full", props.class)}>
			<label for={props.for} class="fieldset-label">
				<span>{props.label}</span>
				<Show when={props.required}>
					<i class={cn("iconify lucide--asterisk", "text-red-500")} />
				</Show>
			</label>
			{props.children}
		</fieldset>
	);
};
