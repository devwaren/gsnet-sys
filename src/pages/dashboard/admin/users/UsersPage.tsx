import { useSuspenseQuery } from "@tanstack/react-query";
import { queries } from "#/libs/client/queries";
import { UsersTable } from "#/shared/components/ui/dashboard/records/users";

export default function UsersPage() {
	const { data, isLoading, isError } = useSuspenseQuery(queries.users.get);

	if (isLoading) {
		return <div>Loading users...</div>;
	}

	if (isError || !data?.success) {
		return <div>Failed to load users. Please try again.</div>;
	}

	if (!data.data) {
		return <div>No users found.</div>;
	}

	return (
		<div>
			<UsersTable data={data.data} />
		</div>
	);
}
