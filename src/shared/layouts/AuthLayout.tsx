import type { ComponentProps } from "react";
import { assets } from "#/assets";

type Props = ComponentProps<"main">;

export default function AuthLayout({ children, className, ...props }: Props) {
	return (
		<main
			{...props}
			className={`relative isolate grid min-h-screen place-items-center overflow-hidden bg-leaves bg-cover bg-center bg-no-repeat px-4 py-12 ${
				className ?? ""
			}`}
		>
			{/* Auth content */}
			<div className="relative w-full max-w-107.5">
				<div className="mb-6 flex justify-center">
					<div className="rounded-full border border-white/30 bg-white/15 p-3 shadow-xl shadow-emerald-950/10 backdrop-blur-md">
						<img
							src={assets.bg.leaves}
							alt=""
							className="size-12 rotate-12 object-contain"
						/>
					</div>
				</div>

				<div>{children}</div>

				<p className="mt-6 text-center text-xs tracking-wide text-white/80">
					Grounded in simplicity. Designed for you.
				</p>
			</div>
		</main>
	);
}
