import { Table } from "#/shared/components/ui/table";

const columns = [
	{
		key: "avatar",
		label: "Profile",
	},
	{
		key: "displayName",
		label: "Display Name",
	},
	{
		key: "role",
		label: "Role",
	},
];

type Props = {
	data: unknown[];
};

export default function UsersTable({ data }: Props) {
	return (
		<Table
			label="All Users"
			desc="Latest registered accounts"
			columns={columns}
			data={data}
			actionLabel="View All"
			onAction={() => console.log("View all users")}
			emptyMessage="No registered users found."
		/>
	);
}
