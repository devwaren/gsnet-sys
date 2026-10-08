import { Form } from "@dev-waren/react-form-kit/hook-form";
import type { FormProps } from "#/features/types";
import { useErrorState } from "#/shared/store/error";
import { useLoginForm } from "./hooks";

export function LoginForm({ children, className }: FormProps) {
	const { form, isPending } = useLoginForm();
	const { error } = useErrorState();

	return (
		<Form {...form} className={className}>
			{children}
			<button
				type="submit"
				className="px-4 py-2 text-sm bg-green-200 rounded-lg w-full"
			>
				{isPending ? "loggin in..." : "login"}
			</button>

			{error && <p className="text-red-400">{error}</p>}
		</Form>
	);
}
