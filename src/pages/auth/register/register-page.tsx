import { RegisterForm } from "#/features/auth/register/form";
import { FormBuilder } from "#/shared/components/builder/form";
import { AuthLayout } from "#/shared/layouts";
import { fields } from "./constants";

export default function RegisterPage() {
	return (
		<AuthLayout>
			<RegisterForm className="space-y-4">
				<div>
					<h2>Account Registration.</h2>
					<p>Register your account to process in the portal.</p>
				</div>
				<FormBuilder fields={fields} />
			</RegisterForm>
		</AuthLayout>
	);
}
