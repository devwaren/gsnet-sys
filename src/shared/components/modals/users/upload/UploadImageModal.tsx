import { ImageUp, ShieldCheck } from "lucide-react";
import { ChangeProfileForm } from "#/features/settings/change-profile";
import { UploadImage } from "./components";
import { styles } from "./styles";

export function UploadImageModal() {
	return (
		<ChangeProfileForm className={styles.form()}>
			<div className="space-y-2">
				<div className={styles.header()}>
					<div className={styles.icon()}>
						<ImageUp size={22} />
					</div>

					<div className="min-w-0">
						<h2 className={styles.h2()}>Upload an image</h2>
						<p className={styles.p()}>
							Add an image attachment to your account.
						</p>
					</div>
				</div>
			</div>

			<div className="space-y-3">
				<UploadImage maxSizeMB={5} />

				<div className={styles.shieldContainer()}>
					<ShieldCheck size={15} className={styles.shieldIcon()} />
					<p>
						Supported formats: PNG, JPG, WebP, and GIF. Maximum file size: 5 MB.
					</p>
				</div>
			</div>

			<div className={styles.buttonContainer()}>
				<button type="submit" className={styles.uploadButton()}>
					<ImageUp size={17} />
					Upload image
				</button>
			</div>
		</ChangeProfileForm>
	);
}
