import { X } from "lucide-react";
import { useModalStore } from "#/shared/store/modal";

export function CloseButton() {
	const { setIsModal } = useModalStore();

	return (
		<button
			type="button"
			onClick={() => setIsModal(false)}
			className="mb-3 flex size-11 items-center justify-center rounded-xl bg-red-100 text-gray-700 cursor-pointer hover:bg-red-200"
		>
			<X size={21} />
		</button>
	);
}
