import type { ComponentProps } from "react";
import { Navbar } from "./components/Navbar";
import { Sidebar } from "./components/Sidebar";

type Props = ComponentProps<"main">;

export default function DashboardLayout({ className, children }: Props) {
	return (
		<main className={className}>
			<Sidebar />
			<div className="flex-4 bg-gray-100 min-h-full">
				<Navbar />
				<div className="p-4">{children}</div>
			</div>
		</main>
	);
}
