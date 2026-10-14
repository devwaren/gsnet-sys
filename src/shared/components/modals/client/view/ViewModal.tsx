import { UserRound, Wifi, X } from "lucide-react";
import { useSelectionStore } from "#/shared/store/selection";

export function ViewModal() {
	const { selection, clearSelection } = useSelectionStore();

	const selectedClient = selection[0];

	const handleModal = () => {
		clearSelection();
	};

	if (!selectedClient) {
		return null;
	}

	const clientDetails = [
		{
			label: "Installation ID",
			value: selectedClient.pppoeId?.toString(),
		},
		{
			label: "First Name",
			value: selectedClient.firstName?.toString(),
		},
		{
			label: "Last Name",
			value: selectedClient.lastName?.toString(),
		},
		{
			label: "email",
			value: selectedClient.email?.toString(),
		},
		{
			label: "phone",
			value: selectedClient.phone?.toString(),
		},
		{
			label: "Plan",
			value: selectedClient.installation.plan,
		},
		{
			label: "installation Date",
			value: selectedClient.installation.date,
		},
		{
			label: "installer",
			value: selectedClient.installation.installer,
		},
	];

	return (
		<div
			role="dialog"
			aria-modal="true"
			aria-labelledby="view-client-title"
			className="w-full max-w-3xl overflow-hidden rounded-2xl border border-gray-200 bg-white shadow-2xl"
		>
			{/* Header */}
			<div className="flex items-center justify-between border-b border-gray-100 px-6 py-5">
				<div className="flex items-center gap-3">
					<div className="flex size-11 items-center justify-center rounded-xl bg-blue-50 text-blue-600">
						<UserRound size={22} />
					</div>

					<div>
						<h2
							id="view-client-title"
							className="text-lg font-semibold tracking-tight text-gray-900"
						>
							Client Details
						</h2>
						<p className="mt-0.5 text-sm text-gray-500">
							Client installation information
						</p>
					</div>
				</div>

				<button
					type="button"
					onClick={handleModal}
					aria-label="Close client details"
					className="flex size-9 items-center justify-center rounded-lg text-gray-500 transition-colors hover:bg-gray-100 hover:text-gray-900 focus-visible:outline-2 focus-visible:outline-blue-600"
				>
					<X size={20} />
				</button>
			</div>

			{/* Content */}
			<div className="space-y-5 p-6">
				<div className="flex items-center gap-3 rounded-xl border border-blue-100 bg-blue-50/60 p-4">
					<div className="flex size-10 shrink-0 items-center justify-center rounded-lg bg-white text-blue-600 shadow-sm">
						<Wifi size={20} />
					</div>

					<div className="min-w-0">
						<p className="text-xs font-medium uppercase tracking-wider text-blue-600">
							Installation ID
						</p>
						<p className="mt-1 truncate text-base font-semibold text-gray-900">
							{selectedClient.pppoeId?.toString() || "Not provided"}
						</p>
					</div>
				</div>

				<div>
					<h3 className="mb-3 text-sm font-semibold text-gray-900">
						Personal Information
					</h3>

					<div className="divide-y divide-gray-100 rounded-xl border border-gray-200">
						{clientDetails.slice(1).map((detail) => (
							<div
								key={detail.label}
								className="flex items-center justify-between gap-4 px-4 py-3.5"
							>
								<span className="text-sm text-gray-500">{detail.label}</span>
								<span className="wrap-break-word text-right text-sm font-medium text-gray-900">
									{detail.value || "Not provided"}
								</span>
							</div>
						))}
					</div>
				</div>
			</div>

			{/* Footer */}
			<div className="flex justify-end border-t border-gray-100 bg-gray-50/70 px-6 py-4">
				<button
					type="button"
					onClick={handleModal}
					className="rounded-lg bg-gray-900 px-5 py-2.5 text-sm font-medium text-white transition-colors hover:bg-gray-700 focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-gray-900"
				>
					Close
				</button>
			</div>
		</div>
	);
}
