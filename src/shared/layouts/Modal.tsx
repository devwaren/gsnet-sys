import type { HTMLMotionProps } from "motion/react";
import { AnimatePresence, motion } from "motion/react";
import type { ReactNode } from "react";
import { useModalStore } from "#/shared/store/modal";

type Props = Omit<HTMLMotionProps<"div">, "onClick"> & {
	title?: string;
	description?: string;
	children: ReactNode;
};

export default function Modal({
	children,
	className,
	title,
	description,
	...props
}: Props) {
	const { setIsModal } = useModalStore();

	return (
		<AnimatePresence>
			<motion.div
				{...props}
				className="fixed inset-0 z-50 grid size-full place-items-center p-4"
				initial={{ opacity: 0 }}
				animate={{ opacity: 1 }}
				exit={{ opacity: 0 }}
				transition={{ duration: 0.2, ease: "easeOut" }}
			>
				<button
					type="button"
					aria-label="Close modal"
					onClick={() => setIsModal(false)}
					className="absolute inset-0 size-full cursor-default bg-black/50 backdrop-blur-sm"
				/>

				<motion.div
					role="dialog"
					aria-modal="true"
					aria-label={title}
					aria-description={description}
					className={`relative z-10 max-h-[90dvh] min-h-80 w-full max-w-3xl overflow-y-auto rounded-xl bg-white p-4 shadow-xl sm:p-6 ${className ?? ""}`}
					initial={{ opacity: 0, y: 8, scale: 0.98 }}
					animate={{ opacity: 1, y: 0, scale: 1 }}
					exit={{ opacity: 0, y: 6, scale: 0.98 }}
					transition={{ duration: 0.2, ease: "easeOut" }}
				>
					{children}
				</motion.div>
			</motion.div>
		</AnimatePresence>
	);
}
