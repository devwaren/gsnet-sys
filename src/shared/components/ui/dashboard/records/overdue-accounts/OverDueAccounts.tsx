import { ArrowRight, CircleUserRound } from "lucide-react";

const accounts = [
	{
		name: "Ana Garcia",
		invoice: "INV-2026-1045",
		amount: 999,
		days: 5,
	},
	{
		name: "Luis Mendoza",
		invoice: "INV-2026-1038",
		amount: 1299,
		days: 12,
	},
	{
		name: "Carlos Santos",
		invoice: "INV-2026-1031",
		amount: 1499,
		days: 18,
	},
];

export default function OverdueAccounts() {
	return (
		<section className="rounded-2xl border border-gray-200/80 bg-white p-4 shadow-sm">
			<div className="flex items-center justify-between gap-2">
				<h2 className="text-base font-semibold text-gray-900">
					Overdue Accounts
				</h2>
				<button
					type="button"
					className="inline-flex shrink-0 items-center gap-1 text-xs font-medium text-blue-600 hover:text-blue-700"
				>
					View All <ArrowRight size={13} />
				</button>
			</div>

			<div className="mt-3 divide-y divide-gray-100">
				{accounts.map((account) => (
					<div
						key={account.invoice}
						className="flex items-center gap-2.5 py-3 first:pt-1 last:pb-1"
					>
						<div className="flex size-10 shrink-0 items-center justify-center rounded-full bg-rose-50 text-rose-500">
							<CircleUserRound size={20} />
						</div>

						<div className="min-w-0 flex-1">
							<p className="truncate text-xs font-semibold text-gray-900">
								{account.name}
							</p>
							<p className="mt-1 truncate text-[11px] text-gray-500">
								{account.invoice}
							</p>
						</div>

						<div className="shrink-0 text-right">
							<p className="text-xs font-semibold text-gray-900">
								{account.amount.toLocaleString("en-PH", {
									style: "currency",
									currency: "PHP",
								})}
							</p>
							<p className="mt-1 text-[11px] font-medium text-rose-500">
								{account.days} days overdue
							</p>
						</div>
					</div>
				))}
			</div>
		</section>
	);
}
