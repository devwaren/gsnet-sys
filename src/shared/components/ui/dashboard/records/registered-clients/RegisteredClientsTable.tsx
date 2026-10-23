import type { z } from "@dev-waren/react-form-kit";
import { useQuery } from "@tanstack/react-query";
import { queries } from "#/libs/client/queries";
import type { schema } from "#/libs/shared/schema";
import { ViewModal } from "#/shared/components/modals/client";
import { TableActions } from "#/shared/components/ui/dashboard/actions";
import { Table } from "#/shared/components/ui/table";
import { Modal } from "#/shared/layouts";
import { useSelectionStore } from "#/shared/store/selection";

type ClientRow = z.infer<typeof schema.customer.client>;

export default function RegisteredClientsTable() {
	const { selection, setSelection } = useSelectionStore();

	const { data: client, isPending, isError } = useQuery(queries.client.get);

	const columns = [
		{
			key: "pppoeId",
			label: "Installation ID",
			className: "font-medium",
		},
		{
			key: "firstName",
			label: "Customer",
			render: (row: ClientRow) =>
				[row.firstName, row.lastName].filter(Boolean).join(" ") || "—",
		},
		{
			key: "installation.plan",
			label: "Plan",
			className: "text-gray-500",
			render: (row: ClientRow) => row.installation.plan,
		},
		{
			key: "installation.installer",
			label: "Installer",
			className: "text-gray-500 capitalize",
			render: (row: ClientRow) => row.installation.installer,
		},
		{
			key: "installation.date",
			label: "Installation Date",
			className: "text-gray-500",
			render: (row: ClientRow) => row.installation.date,
		},
		{
			key: "actions",
			label: "Actions",
			className: "text-right",
			render: (row: ClientRow) => (
				<TableActions
					row={row}
					onEdit={(selected) => {
						setSelection(selected);
					}}
				/>
			),
		},
	];

	if (isPending) {
		return <p className="p-4 text-sm text-gray-500">Loading clients...</p>;
	}

	if (isError || !client?.success) {
		return (
			<p className="p-4 text-sm text-red-500">
				Failed to load registered clients.
			</p>
		);
	}

	return (
		<>
			<Table
				label="Registered Clients"
				desc="Latest list of subscribers"
				columns={columns}
				data={(client.data ?? []) as ClientRow[]}
				actionLabel="View All"
				onAction={() => console.log("View all clients")}
				emptyMessage="No registered clients found."
			/>

			{selection.length > 0 && (
				<Modal>
					<ViewModal />
				</Modal>
			)}
		</>
	);
}
