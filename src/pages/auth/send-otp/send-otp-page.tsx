import { MailCheck } from "lucide-react";
import { OtpForm } from "#/features/auth/send-otp";
import { SubmitButton } from "#/shared/components/buttons";
import { Otp } from "#/shared/components/inputs";
import { styles } from "./styles";

export default function SendOtpPage() {
	return (
		<OtpForm className={styles.form()}>
			<div className={styles.container()}>
				<div className={styles.icon()}>
					<MailCheck size={30} strokeWidth={1.8} />
				</div>

				<div className={styles.content()}>
					<h1 className={styles.heading.h1()}>Verify your email</h1>

					<p className={styles.desc.p1()}>
						We've sent a verification code to your email address. Enter the
						6-digit code below to continue.
					</p>
				</div>

				<div className={styles.otp.section()}>
					<h2 className={styles.heading.h2()}>Verification code</h2>

					<div className={styles.otp.wrapper()}>
						<Otp />
					</div>

					<p className={styles.desc.p2()}>Enter all 6 digits of your code.</p>
				</div>

				<SubmitButton label="Submit" loadinglabel="Submitting" />

				<div className={styles.footer()}>
					<p className={styles.desc.p3()}>
						For your security, never share your verification code with anyone.
					</p>
				</div>
			</div>
		</OtpForm>
	);
}
