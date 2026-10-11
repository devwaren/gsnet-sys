import type { ComponentProps } from "react";

type Props = ComponentProps<"main">;

export default function AuthLayout({ children, className, ...props }: Props) {
	return (
		<main
			className={` min-h-full grid place-items-center px-4 ${className ?? ""}`}
			{...props}
		>
			<div className="w-full max-w-107.5">{children}</div>
		</main>
	);
}
