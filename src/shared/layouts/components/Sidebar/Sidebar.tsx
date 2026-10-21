import { motion } from "motion/react";
import { NavLinks } from "#/shared/components/items";
import { useSession } from "#/shared/hooks";
import { useSidebarStore } from "#/shared/store/sidebar";
import { adminLinks, links, staffLinks } from "./constants";

export default function Sidebar() {
	const { role } = useSession();
	const { isOpen, closeSidebar } = useSidebarStore();

	const isAdmin = role === "admin";

	const isStaff = role === "staff";

	return (
		<>
			{/* Mobile backdrop */}
			{isOpen && (
				<button
					type="button"
					aria-label="Close navigation menu"
					onClick={closeSidebar}
					className="fixed inset-0 z-30 bg-black/40 backdrop-blur-[2px] lg:hidden"
				/>
			)}

			<motion.aside
				id="dashboard-sidebar"
				initial={{ opacity: 0 }}
				animate={{ opacity: 1 }}
				transition={{ duration: 0.2 }}
				aria-label="Dashboard sidebar"
				className={`fixed inset-y-0 left-0 z-40 flex h-dvh min-h-dvh w-72 max-w-[85vw] flex-col overflow-y-auto border-r border-gray-200/80 bg-white p-5 shadow-xl transition-transform duration-300 ease-in-out lg:sticky lg:top-0 lg:z-10 lg:w-auto lg:max-w-none lg:shrink-0 lg:translate-x-0 lg:shadow-none ${
					isOpen ? "translate-x-0" : "-translate-x-full"
				}`}
			>
				<div className="flex-1 space-y-8">
					<header className="space-y-2">
						<h2 className="text-lg font-semibold tracking-tight text-gray-900">
							GS Internet Sys
						</h2>

						<p className="text-sm leading-relaxed text-gray-500">
							Manage your internet service with ease.
						</p>
					</header>

					<div className="h-px w-full bg-linear-to-r from-gray-200 via-gray-100 to-transparent" />

					<nav aria-label="Main navigation" className="space-y-2 text-gray-600">
						<h2 className="text-xs font-semibold uppercase tracking-wider text-gray-400">
							Menu
						</h2>

						<NavLinks links={links} />
					</nav>

					{isStaff ||
						(isAdmin && (
							<nav
								aria-label="Staff Navigation"
								className="space-y-2 text-gray-600"
							>
								<h2 className="text-xs font-semibold uppercase tracking-wider text-gray-400">
									Staff Menu
								</h2>

								<NavLinks links={staffLinks} />
							</nav>
						))}

					{isAdmin && (
						<nav
							aria-label="Admin navigation"
							className="space-y-2 text-gray-600"
						>
							<h2 className="text-xs font-semibold uppercase tracking-wider text-gray-400">
								Admin
							</h2>

							<NavLinks links={adminLinks} />
						</nav>
					)}
				</div>

				<footer className="mt-auto border-t border-gray-100 pt-4">
					<p className="text-xs text-gray-400">GS Internet Sys</p>
				</footer>
			</motion.aside>
		</>
	);
}
