import { Title } from "#/shared/components/ui/dashboard";
import { RegistedClientsTable } from "#/shared/components/ui/dashboard/records";
import { useSession } from "#/shared/hooks";

export default function RegisteredClientsPage() {
	const { role } = useSession();

	return (
		<div className="space-y-4">
			<Title
				title={`Welcome back ${role}`}
				desc="Here's list of registered clients and their plans."
			/>
			<RegistedClientsTable />
		</div>
	);
}
