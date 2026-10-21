import { Title } from "#/shared/components/ui/dashboard";
import type { Invoice } from "#/shared/types";
import { InvoiceFilters, InvoiceSummary } from "./components";

const invoices: Invoice[] = [
	{
		id: "INV-2026-001",
		customer: "Juan Dela Cruz",
		status: "pending",
		total: 12500,
		dueDate: "2026-10-30",
	},
	{
		id: "INV-2026-002",
		customer: "Maria Santos",
		status: "paid",
		total: 8500,
		dueDate: "2026-10-15",
	},
	{
		id: "INV-2026-003",
		customer: "Pedro Reyes",
		status: "overdue",
		total: 18000,
		dueDate: "2026-10-10",
	},
	{
		id: "INV-2026-004",
		customer: "Ana Garcia",
		status: "pending",
		total: 6200,
		dueDate: "2026-11-05",
	},
	{
		id: "INV-2026-005",
		customer: "Carlos Mendoza",
		status: "paid",
		total: 15000,
		dueDate: "2026-10-18",
	},
];

export default function InvoicesPage() {
	return (
		<div className="w-full space-y-6 max-w-2/3 mx-auto">
			<Title title="Invoices" desc="Manage and track customer payments." />

			<div className="w-full space-y-4 lg:max-w-3xl">
				<InvoiceSummary />
				<InvoiceFilters invoices={invoices} />
			</div>
		</div>
	);
}
