import { Camera, LockKeyhole, UserRound } from "lucide-react";
import { Title } from "#/shared/components/ui/dashboard";
import { useSession } from "#/shared/hooks";

export default function SettingsPage() {
	const { profile, role } = useSession();

	const roleSet = role === "admin" ? "Administrator" : "Staff";

	const cardClass = "rounded-xl border border-gray-200 bg-white p-6";

	const headingClass = "text-base font-semibold text-gray-900";

	const descriptionClass = "text-sm text-gray-500";

	const labelClass = "text-sm font-medium text-gray-500";

	return (
		<div className="space-y-6 bg-white p-4">
			<Title
				title="Settings"
				desc="Manage your personal information and account preferences."
			/>

			<div className="grid grid-cols-1 gap-5 lg:grid-cols-2">
				{/* Profile */}
				<section className={cardClass}>
					<div className="mb-6">
						<h2 className={headingClass}>My Profile</h2>
						<p className={descriptionClass}>
							Your personal information and account details.
						</p>
					</div>

					<div className="flex flex-col gap-6 sm:flex-row sm:items-center">
						<div className="relative size-24 shrink-0">
							<div className="grid size-24 place-items-center overflow-hidden rounded-full border border-gray-200 bg-gray-50">
								{profile.avatar ? (
									<img
										src={profile.avatar}
										alt={`${profile.firstName}'s avatar`}
										className="size-full object-cover"
									/>
								) : (
									<span className="text-2xl font-medium text-gray-400">
										{profile.firstName?.charAt(0)?.toUpperCase() ?? "U"}
									</span>
								)}
							</div>

							<button
								type="button"
								aria-label="Change profile picture"
								className="absolute bottom-0 right-0 grid size-8 place-items-center rounded-full border border-gray-200 bg-white text-gray-700 shadow-sm hover:bg-gray-50"
							>
								<Camera size={15} />
							</button>
						</div>

						<div className="grid flex-1 grid-cols-1 gap-5 sm:grid-cols-2">
							<div className="space-y-1">
								<p className={labelClass}>First Name</p>
								<p className="text-sm font-medium text-gray-900">
									{profile.firstName || "Not provided"}
								</p>
							</div>

							<div className="space-y-1">
								<p className={labelClass}>Last Name</p>
								<p className="text-sm font-medium text-gray-900">
									{profile.lastName || "Not provided"}
								</p>
							</div>

							<div className="space-y-1">
								<p className={labelClass}>Role</p>
								<p className="text-sm font-medium text-gray-900">{roleSet}</p>
							</div>
						</div>
					</div>
				</section>

				{/* Security */}
				<section className={cardClass}>
					<div className="mb-6 flex items-start gap-3">
						<div className="grid size-10 shrink-0 place-items-center rounded-lg border border-gray-200 text-gray-700">
							<LockKeyhole size={19} />
						</div>

						<div>
							<h2 className={headingClass}>Security</h2>
							<p className={descriptionClass}>
								Manage your password and account security.
							</p>
						</div>
					</div>

					<div className="space-y-4">
						<div className="flex items-center justify-between gap-4 border-b border-gray-100 pb-4">
							<div>
								<p className="text-sm font-medium text-gray-900">Password</p>
								<p className={descriptionClass}>
									Keep your account credentials secure.
								</p>
							</div>

							<button
								type="button"
								className="shrink-0 rounded-lg border border-gray-200 px-3 py-2 text-sm font-medium text-gray-700 hover:bg-gray-50"
							>
								Update
							</button>
						</div>

						<div className="flex items-center gap-3">
							<UserRound size={18} className="text-gray-400" />
							<div>
								<p className="text-sm font-medium text-gray-900">
									Account role
								</p>
								<p className={descriptionClass}>{roleSet} permissions</p>
							</div>
						</div>
					</div>
				</section>
			</div>
		</div>
	);
}
