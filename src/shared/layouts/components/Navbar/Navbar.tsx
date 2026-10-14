import { Link } from "@tanstack/react-router";
import { Menu, Settings, X } from "lucide-react";
import { LogoutButton } from "#/features/auth/logout";
import { useSession } from "#/shared/hooks";
import { useSidebarStore } from "#/shared/store/sidebar";
import { styles } from "./styles";

export default function Navbar() {
	const { profile } = useSession();
	const { isOpen, toggleSidebar } = useSidebarStore();

	return (
		<header className={styles.header()}>
			<div className="flex min-w-0 flex-1 items-center">
				<button
					type="button"
					onClick={toggleSidebar}
					className="inline-flex size-10 shrink-0 items-center justify-center rounded-xl text-gray-600 transition-colors hover:bg-gray-100 hover:text-gray-900 focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-blue-600 lg:hidden"
					aria-label={isOpen ? "Close navigation menu" : "Open navigation menu"}
					aria-expanded={isOpen}
					aria-controls="dashboard-sidebar"
				>
					{isOpen ? (
						<X size={22} aria-hidden="true" />
					) : (
						<Menu size={22} aria-hidden="true" />
					)}
				</button>
			</div>

			<nav aria-label="Account navigation" className={styles.details()}>
				<Link
					to="/dashboard/settings"
					className={styles.settings()}
					aria-label="Settings"
					title="Settings"
				>
					<Settings size={20} aria-hidden="true" />
				</Link>

				<div
					className={styles.profile.container()}
					title={`${profile.firstName ?? "User"}'s profile`}
				>
					{profile.avatar ? (
						<img
							src={profile.avatar}
							alt={`${profile.firstName ?? "User"}'s avatar`}
							className={styles.profile.avatar()}
						/>
					) : (
						<div className="flex size-full items-center justify-center text-sm font-semibold text-gray-500">
							{profile.firstName?.charAt(0).toUpperCase() ?? "U"}
						</div>
					)}
				</div>

				<LogoutButton />
			</nav>
		</header>
	);
}
