import type { ApexOptions } from "apexcharts";
import Chart from "react-apexcharts";

const revenue = [
	85000, 110000, 98000, 145000, 132000, 175000, 160000, 195000, 182000, 248500,
	220000, 265000,
];

const formatPeso = (value: number) =>
	`₱${value.toLocaleString("en-PH", {
		maximumFractionDigits: 0,
	})}`;

const options: ApexOptions = {
	chart: {
		type: "bar",
		fontFamily: "inherit",
		toolbar: { show: false },
		zoom: { enabled: false },
		animations: {
			enabled: true,
			speed: 600,
		},
	},
	colors: ["#10B981"],
	plotOptions: {
		bar: {
			borderRadius: 5,
			columnWidth: "45%",
			distributed: false,
		},
	},
	dataLabels: {
		enabled: false,
	},
	stroke: {
		show: true,
		width: 2,
		colors: ["transparent"],
	},
	grid: {
		borderColor: "#F1F5F9",
		strokeDashArray: 4,
		padding: {
			left: 8,
			right: 12,
		},
	},
	xaxis: {
		categories: [
			"Jan",
			"Feb",
			"Mar",
			"Apr",
			"May",
			"Jun",
			"Jul",
			"Aug",
			"Sep",
			"Oct",
			"Nov",
			"Dec",
		],
		axisBorder: { show: false },
		axisTicks: { show: false },
		labels: {
			style: {
				colors: "#94A3B8",
				fontSize: "12px",
			},
		},
	},
	yaxis: {
		min: 0,
		labels: {
			formatter: formatPeso,
			style: {
				colors: "#94A3B8",
				fontSize: "11px",
			},
		},
	},
	legend: {
		show: false,
	},
	tooltip: {
		theme: "light",
		y: {
			formatter: formatPeso,
		},
	},
	fill: {
		opacity: 0.9,
	},
	responsive: [
		{
			breakpoint: 640,
			options: {
				plotOptions: {
					bar: {
						columnWidth: "60%",
					},
				},
				yaxis: {
					labels: {
						formatter: (value) => `₱${Math.round(value / 1000)}k`,
					},
				},
			},
		},
	],
};

const series = [
	{
		name: "Revenue",
		data: revenue,
	},
];

export default function RevenueChart() {
	return (
		<section className="min-w-0 rounded-2xl border border-gray-200/80 bg-white p-5 shadow-sm sm:p-6">
			<div className="mb-6 flex flex-wrap items-start justify-between gap-3">
				<div className="space-y-1">
					<h2 className="text-base font-semibold tracking-tight text-gray-900">
						Revenue Overview
					</h2>
					<p className="text-sm text-gray-500">
						Monthly collections for the current year
					</p>
				</div>

				<span className="rounded-lg border border-gray-200 px-3 py-2 text-xs font-medium text-gray-600">
					Jan – Dec 2026
				</span>
			</div>

			<Chart
				options={options}
				series={series}
				type="bar"
				height={280}
				width="100%"
			/>
		</section>
	);
}
