import { Form } from "@dev-waren/react-form-kit/hook-form";
import type { ComponentProps } from "react";
import { useErrorState } from "#/shared/store/error";
import { useResetPasswordForm } from "./hooks";

type Props = ComponentProps<"form">;

export function ResetPasswordForm({ children, className }: Props) {
	const { form, isPending } = useResetPasswordForm();
	const { error } = useErrorState();

	return (
		<Form {...form} className={className}>
			{children}
			<button
				type="submit"
				className="px-4 py-2 text-sm bg-green-200 rounded-lg w-full"
			>
				{isPending ? "Saving..." : "Save"}
			</button>

			{error && <p className="text-red-400">{error}</p>}
		</Form>
	);
}
