import { motion } from "motion/react";
import { NavLinks } from "#/shared/components/items";
import { useSession } from "#/shared/hooks";
import { adminLinks, links } from "./constants";

export default function Sidebar() {
	const { role } = useSession();

	const isAdmin = role === "admin";

	return (
		<motion.div
			initial={{ opacity: 0, x: -8 }}
			animate={{ opacity: 1, x: 0 }}
			transition={{ duration: 0.35, ease: "easeOut" }}
			className="sticky top-0 flex h-dvh min-h-dvh flex-col border-r border-gray-200/80 bg-white p-5"
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
		</motion.div>
	);
}
