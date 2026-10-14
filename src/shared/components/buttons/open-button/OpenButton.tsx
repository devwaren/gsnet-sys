import { type LucideIcon, Plus } from "lucide-react";
import { useModalStore } from "#/shared/store/modal";

type Props = {
	label: string;
	icon?: LucideIcon;
};

export function OpenButton({ label, icon: Icon = Plus }: Props) {
	const { setIsModal } = useModalStore();

	return (
		<button
			type="button"
			onClick={() => setIsModal(true)}
			aria-label={label || "Open modal"}
			className="mb-3 inline-flex items-center justify-center gap-2 rounded-xl bg-white border border-gray-300 px-4 py-2.5 text-sm font-medium text-gray-700 transition-colors hover:bg-gray-200 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-red-500 focus-visible:ring-offset-2 active:scale-[0.98] cursor-pointer"
		>
			<Icon size={18} aria-hidden="true" />
			<span>{label || "Open button"}</span>
		</button>
	);
}
