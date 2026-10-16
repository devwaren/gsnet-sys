import { Form } from "@dev-waren/react-form-kit/hook-form";
import type { ComponentProps } from "react";
import { useUploadAttachmentForm } from "./hooks";

type Props = ComponentProps<"form">;

export function UploadAttachmentForm({ children, ...props }: Props) {
	const form = useUploadAttachmentForm();

	return (
		<Form {...form} {...props}>
			{children}
		</Form>
	);
}
