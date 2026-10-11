import type { ApexOptions } from "apexcharts";
import Chart from "react-apexcharts";

const plans = [
	{ name: "Fiber 15 Mbps", count: 300, color: "#10B981" },
	{ name: "Fiber 20 Mbps", count: 475, color: "#3B82F6" },
	{ name: "Fiber 30 Mbps", count: 15, color: "#1C88F7" },
	{ name: "Fiber 50 Mbps", count: 275, color: "#F59E0B" },
	{ name: "Others", count: 48, color: "#CBD5E1" },
];

const options: ApexOptions = {
	chart: {
		type: "donut",
		fontFamily: "inherit",
		toolbar: { show: false },
	},
	labels: plans.map((plan) => plan.name),
	colors: plans.map((plan) => plan.color),
	stroke: { width: 0 },
	dataLabels: { enabled: false },
	legend: { show: false },
	plotOptions: {
		pie: {
			donut: {
				size: "68%",
				labels: {
					show: true,
					name: { show: false },
					value: { show: false },
					total: {
						show: true,
						showAlways: true,
						label: "Subscribers",
						fontSize: "12px",
						fontWeight: 400,
						color: "#64748B",
						formatter: () => "1,248",
					},
				},
			},
		},
	},
	tooltip: {
		y: {
			formatter: (value) => `${value} subscribers`,
		},
	},
};

export default function SubscriberDistribution() {
	return (
		<section className="rounded-2xl border border-gray-200/80 bg-white p-5 shadow-sm">
			<h2 className="text-base font-semibold text-gray-900">
				Subscriber Plan Distribution
			</h2>
			<p className="mt-1 text-sm text-gray-500">Active subscribers by plan</p>

			<div className="mt-4 grid grid-cols-[minmax(0,1fr)_minmax(0,1.1fr)] items-center gap-3">
				<Chart
					options={options}
					series={plans.map((plan) => plan.count)}
					type="donut"
					height={190}
					width="100%"
				/>

				<div className="space-y-3">
					{plans.map((plan) => (
						<div
							key={plan.name}
							className="flex items-center justify-between gap-2 text-xs"
						>
							<div className="flex min-w-0 items-center gap-2">
								<span
									className="size-2.5 shrink-0 rounded-full"
									style={{ backgroundColor: plan.color }}
								/>
								<span className="truncate text-gray-600">{plan.name}</span>
							</div>
							<span className="font-medium text-gray-900">
								{Math.round((plan.count / 1248) * 100)}%
							</span>
						</div>
					))}
				</div>
			</div>
		</section>
	);
}
