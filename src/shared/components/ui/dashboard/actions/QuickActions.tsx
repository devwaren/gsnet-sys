import {
	CreditCard,
	FileText,
	type LucideIcon,
	Plus,
	Users,
} from "lucide-react";

const actions: {
	label: string;
	desc: string;
	icon: LucideIcon;
	color: string;
}[] = [
	{
		label: "Add Customer",
		desc: "New subscriber",
		icon: Plus,
		color: "bg-emerald-50 text-emerald-600",
	},
	{
		label: "Create Invoice",
		desc: "Generate bill",
		icon: FileText,
		color: "bg-blue-50 text-blue-600",
	},
	{
		label: "Record Payment",
		desc: "Log payment",
		icon: CreditCard,
		color: "bg-violet-50 text-violet-600",
	},
	{
		label: "Manage Plans",
		desc: "Edit packages",
		icon: Users,
		color: "bg-amber-50 text-amber-600",
	},
];

export default function QuickActions() {
	return (
		<section className="rounded-2xl border border-gray-200/80 bg-white p-4 shadow-sm">
			<h2 className="text-base font-semibold text-gray-900">Quick Actions</h2>

			<div className="mt-3 grid grid-cols-2 gap-2">
				{actions.map((action) => {
					const Icon = action.icon;

					return (
						<button
							key={action.label}
							type="button"
							className="flex min-w-0 items-center gap-2 rounded-xl border border-gray-100 p-2.5 text-left transition hover:border-emerald-200 hover:bg-emerald-50/40 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-emerald-500"
						>
							<span
								className={`flex size-10 shrink-0 items-center justify-center rounded-xl ${action.color}`}
							>
								<Icon size={19} />
							</span>

							<span className="min-w-0">
								<span className="block truncate text-xs font-semibold text-gray-900">
									{action.label}
								</span>
								<span className="mt-1 block truncate text-[11px] text-gray-500">
									{action.desc}
								</span>
							</span>
						</button>
					);
				})}
			</div>
		</section>
	);
}
