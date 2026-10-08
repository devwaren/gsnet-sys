import { LoginForm } from "#/features/auth";
import { FormBuilder } from "#/shared/components/builder/form";
import { formFields } from "./constants";
import { styles } from "./styles";

export default function LoginPage() {
	return (
		<div className={styles.form()}>
			<div className={styles.title.container()}>
				<h1 className={styles.title.name()}>Welcome Back</h1>
				<p className={styles.title.desc()}>Please sign in to your account.</p>
			</div>

			<LoginForm className="space-y-2">
				<FormBuilder fields={formFields} />
			</LoginForm>
		</div>
	);
}
