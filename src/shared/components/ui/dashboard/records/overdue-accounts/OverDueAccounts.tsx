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
		<section className="grid h-full min-w-0 grid-cols-1 rounded-2xl border border-gray-200/80 bg-white p-3 shadow-sm sm:p-4">
			<div className="flex min-w-0 items-center justify-between gap-2">
				<h2 className="min-w-0 text-sm font-semibold text-gray-900 sm:text-base">
					Overdue Accounts
				</h2>

				<button
					type="button"
					className="inline-flex shrink-0 items-center gap-1 text-xs font-medium text-blue-600 transition-colors hover:text-blue-700"
				>
					View All <ArrowRight size={13} />
				</button>
			</div>

			<div className="mt-3 min-w-0 divide-y divide-gray-100">
				{accounts.map((account) => (
					<div
						key={account.invoice}
						className="flex min-w-0 items-center gap-2 py-3 first:pt-1 last:pb-1 sm:gap-2.5"
					>
						<div className="flex size-9 shrink-0 items-center justify-center rounded-full bg-rose-50 text-rose-500 sm:size-10">
							<CircleUserRound size={20} />
						</div>

						<div className="min-w-0 flex-1">
							<p className="truncate text-xs font-semibold text-gray-900">
								{account.name}
							</p>

							<p className="mt-1 break-all text-[10px] text-gray-500 sm:text-[11px]">
								{account.invoice}
							</p>
						</div>

						<div className="min-w-0 max-w-[44%] shrink-0 text-right">
							<p className="text-xs font-semibold text-gray-900">
								{account.amount.toLocaleString("en-PH", {
									style: "currency",
									currency: "PHP",
								})}
							</p>

							<p className="mt-1 text-[10px] font-medium leading-tight text-rose-500 sm:text-[11px]">
								{account.days} days overdue
							</p>
						</div>
					</div>
				))}
			</div>
		</section>
	);
}
