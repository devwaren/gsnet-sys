import { LoaderCircle, LogOut } from "lucide-react";
import { useLogout } from "./hooks";

export default function LogoutButton() {
	const { mutate: logout, isPending } = useLogout();

	const handleLogout = () => {
		logout();
	};

	return (
		<button
			type="button"
			onClick={handleLogout}
			disabled={isPending}
			className="flex w-full items-center gap-3 rounded-lg px-3 py-2 text-sm font-medium text-red-600 transition-colors hover:bg-red-50 disabled:cursor-not-allowed disabled:opacity-60"
		>
			{isPending ? (
				<LoaderCircle className="size-4 animate-spin" />
			) : (
				<LogOut className="size-4" />
			)}
			<span>{isPending ? "Signing out..." : "Logout"}</span>
		</button>
	);
}
