import { MoreVertical } from "lucide-react";
import { Table } from "#/shared/components/ui/table";

const users = [
	{
		id: "USR-001",
		avatar:
			"https://images.unsplash.com/photo-1599566150163-29194dcaad36?q=80&w=687&auto=format&fit=crop",
		username: "@jonas_m",
		role: "User",
		registrationDate: "Oct 11, 2026",
		status: "Active",
	},
	{
		id: "USR-002",
		avatar:
			"https://plus.unsplash.com/premium_photo-1690407617542-2f210cf20d7e?q=80&w=687&auto=format&fit=crop",
		username: "@anna_w",
		role: "User",
		registrationDate: "Oct 11, 2026",
		status: "Active",
	},
];

type Active = (typeof users)[number];

const statusStyles: Record<Active["status"], string> = {
	Active: "bg-emerald-50 text-emerald-700",
	Unactive: "bg-amber-50 text-amber-700",
	Pending: "bg-gray-50 text-gray-700",
};

const columns = [
	{
		key: "avatar",
		label: "Profile",
	},
	{
		key: "id",
		label: "User ID",
		className: "font-medium",
	},
	{
		key: "username",
		label: "Display Name",
	},
	{
		key: "role",
		label: "Role",
	},
	{
		key: "registrationDate",
		label: "Registration Date",
	},
	{
		key: "status",
		label: "Status",
		render: (active: Active) => (
			<span
				className={`rounded-full px-2.5 py-1 font-medium ${
					statusStyles[active.status]
				}`}
			>
				{active.status}
			</span>
		),
	},
	{
		key: "actions",
		label: "",
		render: (active: Active) => (
			<button
				type="button"
				aria-label={`Actions for ${active.id}`}
				className="rounded-md p-1 text-gray-400 transition hover:bg-gray-100 hover:text-gray-700"
				onClick={() => console.log("User actions:", active.id)}
			>
				<MoreVertical size={16} />
			</button>
		),
	},
];

export default function UsersTable() {
	return (
		<Table
			label="All Users"
			desc="Latest registered accounts"
			columns={columns}
			data={users}
			actionLabel="View All"
			onAction={() => console.log("View all users")}
			emptyMessage="No registered users found."
		/>
	);
}
