import type { ComponentProps } from "react";

type Props = ComponentProps<"main">;

export default function AuthLayout({ children, className, ...props }: Props) {
	return (
		<main
			className={`flex min-h-full items-center justify-center p-4 ${className ?? ""}`}
			{...props}
		>
			<div className="w-full lg:max-w-1/3">{children}</div>
		</main>
	);
}
