import type { ComponentProps } from "react";
import { useModalStore } from "#/shared/store/modal";

type Props = Omit<ComponentProps<"div">, "onClick">;

export default function Modal({ children, className, ...props }: Props) {
	const { setIsModal } = useModalStore();

	return (
		<div
			{...props}
			className="fixed inset-0 z-50 grid size-full place-items-center p-4"
		>
			<button
				type="button"
				aria-label="Close modal"
				onClick={() => setIsModal(false)}
				className="absolute inset-0 size-full cursor-default bg-black/60"
			/>

			<div
				role="dialog"
				aria-modal="true"
				className={`relative z-10 max-h-[90dvh] min-h-80 overflow-y-auto  w-full max-w-3xl sm:p-6 ${className ?? ""}`}
			>
				{children}
			</div>
		</div>
	);
}
