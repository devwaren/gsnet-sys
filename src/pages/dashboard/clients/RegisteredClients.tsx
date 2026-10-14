import { OpenButton } from "#/shared/components/buttons";
import { AddClientModal } from "#/shared/components/modals/client";
import { Title } from "#/shared/components/ui/dashboard";
import { RegistedClientsTable } from "#/shared/components/ui/dashboard/records";
import { useSession } from "#/shared/hooks";
import { useModalStore } from "#/shared/store/modal";

export default function RegisteredClientsPage() {
	const { role } = useSession();

	const { isModal } = useModalStore();

	return (
		<div className="space-y-4">
			<div className="flex justify-between">
				<Title
					title={`Welcome back ${role}`}
					desc="Here's list of registered clients and their plans."
				/>
				<OpenButton label="Add Client" />
			</div>
			<RegistedClientsTable />
			{isModal && <AddClientModal />}
		</div>
	);
}
