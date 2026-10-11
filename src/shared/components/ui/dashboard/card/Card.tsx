import { ArrowUpRight, type LucideIcon } from "lucide-react";

const themes = {
	blue: {
		icon: "bg-blue-50 text-blue-600",
		accent: "text-blue-600",
		line: "#2563EB",
		gradient: "card-gradient-blue",
	},
	emerald: {
		icon: "bg-emerald-50 text-emerald-600",
		accent: "text-emerald-600",
		line: "#10B981",
		gradient: "card-gradient-emerald",
	},
	amber: {
		icon: "bg-amber-50 text-amber-600",
		accent: "text-amber-600",
		line: "#F59E0B",
		gradient: "card-gradient-amber",
	},
	rose: {
		icon: "bg-rose-50 text-rose-600",
		accent: "text-rose-600",
		line: "#F43F5E",
		gradient: "card-gradient-rose",
	},
} as const;

type CardColor = keyof typeof themes;

type Props = {
	item: {
		icon: LucideIcon;
		title: string;
		count: number;
		percentage: number;
		color: CardColor;
		currency?: boolean;
	};
};

export default function Card({ item }: Props) {
	const theme = themes[item.color];

	const count = item.count.toLocaleString("en-PH", {
		minimumFractionDigits: item.currency ? 2 : 0,
		maximumFractionDigits: item.currency ? 2 : 0,
	});

	return (
		<div className="group flex min-w-0 items-center justify-between gap-3 rounded-2xl border border-gray-200/80 bg-white p-5 shadow-sm transition-all duration-200 hover:-translate-y-0.5 hover:shadow-md">
			<div className="flex min-w-0 items-center gap-3">
				<div
					className={`flex size-11 shrink-0 items-center justify-center rounded-xl ${theme.icon}`}
				>
					<item.icon size={21} strokeWidth={2} />
				</div>

				<div className="min-w-0 space-y-1.5">
					<p className="text-xs font-medium leading-5 text-gray-500">
						{item.title}
					</p>

					<p className="wrap-break-word flex items-center gap-2 text-2xl font-semibold tracking-tight text-gray-900">
						{item.currency && "₱"}
						{count}
					</p>

					<div className="flex flex-wrap items-center gap-1 text-xs">
						<ArrowUpRight
							size={14}
							strokeWidth={2.5}
							className={theme.accent}
						/>

						<span className={`font-semibold ${theme.accent}`}>
							{item.percentage}%
						</span>

						<span className="text-gray-400">vs last month</span>
					</div>
				</div>
			</div>

			<div className="w-14 shrink-0 self-end pb-1">
				<svg
					viewBox="0 0 80 44"
					fill="none"
					xmlns="http://www.w3.org/2000/svg"
					className="w-full overflow-visible"
					aria-hidden="true"
				>
					<defs>
						<linearGradient
							id={theme.gradient}
							x1="40"
							y1="4"
							x2="40"
							y2="44"
							gradientUnits="userSpaceOnUse"
						>
							<stop stopColor={theme.line} stopOpacity="0.2" />
							<stop offset="1" stopColor={theme.line} stopOpacity="0" />
						</linearGradient>
					</defs>

					<path
						d="M2 35 C10 35 13 24 20 25 S30 33 38 20 S50 5 57 13 S69 17 78 4 V44 H2 Z"
						fill={`url(#${theme.gradient})`}
					/>

					<path
						d="M2 35 C10 35 13 24 20 25 S30 33 38 20 S50 5 57 13 S69 17 78 4"
						stroke={theme.line}
						strokeWidth="1.8"
						strokeLinecap="round"
					/>
				</svg>
			</div>
		</div>
	);
}
