import type { z } from "@dev-waren/react-form-kit";
import { X } from "lucide-react";
import { useState } from "react";
import type { schema } from "#/libs/shared/validations";
import { Table } from "#/shared/components/ui/table";
import { Modal } from "#/shared/layouts";
import { useSelectionStore } from "#/shared/store/selection";
import { TableActions } from "../../actions";

type User = z.infer<typeof schema.auth.users> & {
	role: string;
	displayName: string;
};

type Props = {
	data: User[];
};

export default function UsersTable({ data }: Props) {
	const { setSelection } = useSelectionStore();

	const [isOpen, setIsOpen] = useState(false);
	const [selectedUser, setSelectedUser] = useState<User | null>(null);

	const closeModal = () => {
		setIsOpen(false);
		setSelectedUser(null);
		setSelection([]);
	};

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
		{
			key: "actions",
			label: "Actions",
			className: "text-right",
			render: (row: User) => (
				<TableActions
					row={row}
					onEdit={(selected) => {
						setSelection(selected);

						setSelectedUser(row);
						setIsOpen(true);
					}}
				/>
			),
		},
	];

	return (
		<>
			<Table
				label="All Users"
				desc="Latest registered accounts"
				columns={columns}
				data={data}
				actionLabel="View All"
				onAction={() => console.log("View all users")}
				emptyMessage="No registered users found."
			/>

			{isOpen && selectedUser && (
				<Modal>
					<div className="w-full max-w-2xl rounded-xl bg-white p-6">
						<div className="mb-6 flex items-center justify-between">
							<h2 className="text-lg font-semibold">User&apos;s Information</h2>

							<button
								type="button"
								onClick={closeModal}
								aria-label="Close user information"
							>
								<X />
							</button>
						</div>

						<div className="grid grid-cols-2 gap-6">
							<div>
								{selectedUser.avatar && (
									<img
										src={selectedUser.avatar}
										alt={`${selectedUser.displayName}'s avatar`}
										className="h-24 w-24 rounded-full object-cover"
									/>
								)}

								<p className="mt-4 text-sm text-gray-500">Display Name</p>
								<p className="font-medium">{selectedUser.displayName}</p>

								<p className="mt-4 text-sm text-gray-500">Role</p>
								<p className="font-medium">
									{selectedUser.role ?? "Unassigned"}
								</p>
							</div>
						</div>
					</div>
				</Modal>
			)}
		</>
	);
}
