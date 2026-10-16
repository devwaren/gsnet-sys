import { ImageUp, ShieldCheck } from "lucide-react";
import { UploadAttachmentForm } from "#/features/auth/upload";
import { UploadImage } from "./components";

export function UploadImageModal() {
	return (
		<UploadAttachmentForm className="w-full space-y-6">
			<div className="space-y-2">
				<div className="flex items-center gap-3">
					<div className="flex size-11 items-center justify-center rounded-xl bg-blue-50 text-blue-600">
						<ImageUp size={22} />
					</div>

					<div className="min-w-0">
						<h2 className="text-lg font-semibold tracking-tight text-gray-900">
							Upload an image
						</h2>
						<p className="text-sm text-gray-500">
							Add an image attachment to your account.
						</p>
					</div>
				</div>
			</div>

			<div className="space-y-3">
				<UploadImage maxSizeMB={5} />

				<div className="flex items-start gap-2 text-xs text-gray-500">
					<ShieldCheck size={15} className="mt-0.5 shrink-0" />
					<p>
						Supported formats: PNG, JPG, WebP, and GIF. Maximum file size: 5 MB.
					</p>
				</div>
			</div>

			<div className="flex flex-col-reverse gap-3 border-t border-gray-100 pt-5 sm:flex-row sm:justify-end">
				<button
					type="submit"
					className="inline-flex w-full items-center justify-center gap-2 rounded-xl bg-blue-600 px-5 py-3 text-sm font-semibold text-white shadow-sm transition hover:bg-blue-700 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-blue-500 focus-visible:ring-offset-2 active:scale-[0.99] sm:w-auto"
				>
					<ImageUp size={17} />
					Upload image
				</button>
			</div>
		</UploadAttachmentForm>
	);
}
