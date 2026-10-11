import { MoreVertical } from "lucide-react";
import { Table } from "#/shared/components/ui/table";

const invoices = [
	{
		id: "CAB-2026-1048",
		customer: "Rico Abundo",
		plan: "Fiber 30 Mbps",
		amount: 1000,
		dueDate: "Oct 15, 2026",
		status: "Installed",
	},
	{
		id: "CHY-2026-1047",
		customer: "Harrieth Yalong",
		plan: "Fiber 30 Mbps",
		amount: 1000,
		dueDate: "Oct 15, 2026",
		status: "Installed",
	},
	{
		id: "CAQ-2026-1049",
		customer: "Analyn Quintana",
		plan: "Fiber 30 Mbps",
		amount: 1000,
		dueDate: "Oct 12, 2024",
		status: "Installed",
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
		status: "Installed",
	},
	{
		id: "INV-2026-1044",
		customer: "Roberto Lim",
		plan: "Fiber 200 Mbps",
		amount: 1299,
		dueDate: "Oct 12, 2026",
		status: "Disconnected",
	},
];

type Invoice = (typeof invoices)[number];

const statusStyles: Record<Invoice["status"], string> = {
	Installed: "bg-emerald-50 text-emerald-700",
	Pending: "bg-amber-50 text-amber-700",
	Disconnected: "bg-rose-50 text-rose-700",
};

const columns = [
	{
		key: "id",
		label: "Invoice",
		className: "font-medium",
	},
	{
		key: "customer",
		label: "Customer",
	},
	{
		key: "plan",
		label: "Plan",
		className: "text-gray-500",
	},
	{
		key: "amount",
		label: "Amount",
		className: "font-semibold text-gray-900",
		render: (invoice: Invoice) =>
			invoice.amount.toLocaleString("en-PH", {
				style: "currency",
				currency: "PHP",
			}),
	},
	{
		key: "dueDate",
		label: "Installation Date",
		className: "text-gray-500",
	},
	{
		key: "status",
		label: "Status",
		render: (invoice: Invoice) => (
			<span
				className={`rounded-full px-2.5 py-1 font-medium ${
					statusStyles[invoice.status]
				}`}
			>
				{invoice.status}
			</span>
		),
	},
	{
		key: "actions",
		label: "",
		render: (invoice: Invoice) => (
			<button
				type="button"
				aria-label={`Actions for ${invoice.id}`}
				className="rounded-md p-1 text-gray-400 transition hover:bg-gray-100 hover:text-gray-700"
				onClick={() => console.log("Invoice actions:", invoice.id)}
			>
				<MoreVertical size={16} />
			</button>
		),
	},
];

export default function RegisteredClientsTable() {
	return (
		<Table
			label="Registered Clients"
			desc="Latest list of subscribers"
			columns={columns}
			data={invoices}
			actionLabel="View All"
			onAction={() => console.log("View all clients")}
			emptyMessage="No registered clients found."
		/>
	);
}
