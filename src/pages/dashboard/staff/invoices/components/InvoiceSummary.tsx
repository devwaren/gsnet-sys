import { Mapper } from "@dev-waren/react-form-kit";
import { FileText, Wallet } from "lucide-react";

const stats = [
	{
		title: "Total invoices",
		value: "128",
		desc: "Across all customers",
		icon: FileText,
	},
	{
		title: "Outstanding",
		value: "₱84,000",
		desc: "Awaiting payment",
		icon: Wallet,
	},
];

export function InvoiceSummary() {
	return (
		<Mapper
			items={stats}
			listFor="items"
			className="grid w-full grid-cols-1 gap-4 sm:grid-cols-2"
		>
			{({ title, value, desc, icon: Icon }) => (
				<div
					key={title}
					className="flex items-start justify-between gap-4 rounded-xl bg-white border border-gray-200 p-5"
				>
					<div className="space-y-2">
						<h2 className="text-sm font-medium text-gray-600">{title}</h2>
						<p className="text-2xl font-semibold tracking-tight">{value}</p>
						<p className="text-sm text-gray-500">{desc}</p>
					</div>

					<div className="rounded-lg bg-gray-100 p-3">
						<Icon className="size-5 text-gray-600" aria-hidden="true" />
					</div>
				</div>
			)}
		</Mapper>
	);
}
