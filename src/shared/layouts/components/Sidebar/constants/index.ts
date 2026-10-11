import {
	Coins,
	DollarSign,
	LayoutDashboard,
	Newspaper,
	PaperBag,
	Settings,
	UserSquare,
	Users2,
	UsersRound,
} from "lucide-react";

export const links = [
	{
		label: "Dashboard",
		link: "/dashboard",
		icon: LayoutDashboard,
		exact: true,
	},
	{
		label: "Billing",
		link: "/dashboard/billing",
		icon: DollarSign,
	},
	{
		label: "Reports",
		link: "/dashboard/reports",
		icon: Newspaper,
	},
	{
		label: "Registered Clients",
		link: "/dashboard/registered-clients",
		icon: UsersRound,
	},
	{
		label: "Expenses",
		link: "/dashboard/expenses",
		icon: Coins,
	},
	{
		label: "Settings",
		link: "/dashboard/settings",
		icon: Settings,
	},
];

export const adminLinks = [
	{
		label: "Users",
		link: "/dashboard/admin/users",
		icon: Users2,
	},
	{
		label: "Plans",
		link: "/dashboard/admin/plans",
		icon: PaperBag,
	},
	{
		label: "Clients",
		link: "/dashboard/admin/clients",
		icon: UserSquare,
	},
];
