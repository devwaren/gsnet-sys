import { Form } from "@dev-waren/react-form-kit/hook-form";
import type { ComponentProps } from "react";
import { useErrorState } from "#/shared/store/error";
import { useRegisterForm } from "./hooks";

type Props = ComponentProps<"form">;

export function RegisterForm({ className, children }: Props) {
	const { form, isPending } = useRegisterForm();
	const { error } = useErrorState();

	return (
		<Form {...form} className={className}>
			{children}
			<button
				type="submit"
				className="px-4 py-2 text-sm bg-green-200 rounded-lg w-full"
			>
				{isPending ? "Registering..." : "Register"}
			</button>

			{error && <p className="text-red-400">{error}</p>}
		</Form>
	);
}
