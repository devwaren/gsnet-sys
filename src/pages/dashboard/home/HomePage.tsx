import { Mapper } from "@dev-waren/react-form-kit";
import {
	AlertCircle,
	Clock,
	Coins,
	type LucideIcon,
	Users,
} from "lucide-react";
import { Card, Title } from "#/shared/components/ui/dashboard";
import { QuickActions } from "#/shared/components/ui/dashboard/actions";
import {
	RevenueChart,
	SubscriberDistribution,
} from "#/shared/components/ui/dashboard/charts";
import {
	OverdueAccounts,
	RecentInvoices,
} from "#/shared/components/ui/dashboard/records";
import { useSession } from "#/shared/hooks";

type Cards = {
	icon: LucideIcon;
	title: string;
	percentage: number;
	count: number;
	color: "blue" | "emerald" | "amber" | "rose";
	currency?: boolean;
};

const cards: Cards[] = [
	{
		icon: Users,
		title: "Total Users",
		percentage: 12,
		count: 1534,
		color: "blue",
	},
	{
		icon: Coins,
		title: "Total Revenues",
		count: 125678,
		percentage: 30,
		color: "emerald",
		currency: true,
	},
	{
		icon: Clock,
		title: "Total Outstanding Bills",
		count: 13000,
		percentage: 12,
		color: "amber",
		currency: true,
	},
	{
		icon: AlertCircle,
		title: "Overdue Accounts",
		count: 14,
		percentage: 10,
		color: "rose",
	},
];

export default function HomePage() {
	const { profile } = useSession();

	return (
		<div className="w-full space-y-4 h-full min-h-full">
			<Title
				title="Dashboard"
				desc={`Welcome back! ${profile.firstName}, Here's an overview of your ISP business.`}
			/>
			<div className="grid grid-cols-4 gap-4 h-full min-h-full">
				<div className="col-span-3 space-y-4">
					<Mapper
						listFor="cards"
						items={cards}
						className="grid w-full grid-cols-1 items-stretch gap-4 sm:grid-cols-2 xl:grid-cols-4"
					>
						{(item) => <Card item={item} />}
					</Mapper>
					<RevenueChart />
					<div>
						<RecentInvoices />
					</div>
				</div>
				<div className=" w-full max-w-100 space-y-4 grid">
					<SubscriberDistribution />
					<QuickActions />
					<OverdueAccounts />
				</div>
			</div>
		</div>
	);
}
