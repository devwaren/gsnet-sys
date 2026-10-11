import { ArrowRight, MoreVertical } from "lucide-react";

const invoices = [
	{
		id: "INV-2026-1048",
		customer: "Juan Dela Cruz",
		plan: "Fiber 200 Mbps",
		amount: 1299,
		dueDate: "Oct 15, 2026",
		status: "Paid",
	},
	{
		id: "INV-2026-1047",
		customer: "Maria Santos",
		plan: "Fiber 100 Mbps",
		amount: 999,
		dueDate: "Oct 15, 2026",
		status: "Paid",
	},
	{
		id: "INV-2026-1046",
		customer: "Pedro Reyes",
		plan: "Fiber 300 Mbps",
		amount: 1499,
		dueDate: "Oct 20, 2026",
		status: "Pending",
	},
	{
		id: "INV-2026-1045",
		customer: "Ana Garcia",
		plan: "Fiber 100 Mbps",
		amount: 999,
		dueDate: "Oct 18, 2026",
		status: "Overdue",
	},
	{
		id: "INV-2026-1044",
		customer: "Roberto Lim",
		plan: "Fiber 200 Mbps",
		amount: 1299,
		dueDate: "Oct 12, 2026",
		status: "Paid",
	},
];

const statusStyles = {
	Paid: "bg-emerald-50 text-emerald-700",
	Pending: "bg-amber-50 text-amber-700",
	Overdue: "bg-rose-50 text-rose-700",
};

export default function RecentInvoices() {
	return (
		<section className="min-w-0 overflow-hidden rounded-2xl border border-gray-200/80 bg-white shadow-sm">
			<div className="flex items-center justify-between gap-3 p-5">
				<div>
					<h2 className="text-base font-semibold text-gray-900">
						Recent Invoices
					</h2>
					<p className="mt-1 text-sm text-gray-500">
						Latest billing activity from your subscribers
					</p>
				</div>

				<button
					type="button"
					className="inline-flex shrink-0 items-center gap-2 rounded-lg border border-gray-200 px-3 py-2 text-xs font-medium text-gray-700 transition hover:bg-gray-50"
				>
					View All <ArrowRight size={14} />
				</button>
			</div>

			<div className="overflow-x-auto">
				<table className="w-full min-w-175 text-left text-xs">
					<thead className="bg-gray-50 text-gray-500">
						<tr>
							{[
								"Invoice",
								"Customer",
								"Plan",
								"Amount",
								"Due Date",
								"Status",
								"",
							].map((label) => (
								<th key={label || "actions"} className="px-4 py-3 font-medium">
									{label}
								</th>
							))}
						</tr>
					</thead>

					<tbody className="divide-y divide-gray-100">
						{invoices.map((invoice) => (
							<tr key={invoice.id} className="transition hover:bg-gray-50/70">
								<td className="whitespace-nowrap px-4 py-3.5 font-medium text-gray-700">
									{invoice.id}
								</td>
								<td className="whitespace-nowrap px-4 py-3.5 text-gray-700">
									{invoice.customer}
								</td>
								<td className="whitespace-nowrap px-4 py-3.5 text-gray-500">
									{invoice.plan}
								</td>
								<td className="whitespace-nowrap px-4 py-3.5 font-semibold text-gray-900">
									{invoice.amount.toLocaleString("en-PH", {
										style: "currency",
										currency: "PHP",
									})}
								</td>
								<td className="whitespace-nowrap px-4 py-3.5 text-gray-500">
									{invoice.dueDate}
								</td>
								<td className="px-4 py-3.5">
									<span
										className={`rounded-full px-2.5 py-1 font-medium ${statusStyles[invoice.status as keyof typeof statusStyles]}`}
									>
										{invoice.status}
									</span>
								</td>
								<td className="px-4 py-3.5">
									<button
										type="button"
										aria-label={`Actions for ${invoice.id}`}
										className="rounded-md p-1 text-gray-400 hover:bg-gray-100 hover:text-gray-700"
									>
										<MoreVertical size={16} />
									</button>
								</td>
							</tr>
						))}
					</tbody>
				</table>
			</div>
		</section>
	);
}
