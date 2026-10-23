import { Mapper } from "@dev-waren/react-form-kit";
import { FileText, Wallet } from "lucide-react";
import { styles } from "./styles";

const stats = [
	{
		title: "Total invoices",
		value: "128",
		desc: "Across all customers",
		icon: FileText,
	},
	{
		title: "Outstanding",
		value: "₱84,000",
		desc: "Awaiting payment",
		icon: Wallet,
	},
];

export function InvoiceSummary() {
	return (
		<Mapper items={stats} listFor="items" className={styles.summaryMapper()}>
			{({ title, value, desc, icon: Icon }) => (
				<div className={styles.icons()}>
					<div className="space-y-2">
						<h2 className={styles.h2()}>{title}</h2>
						<p className={styles.value()}>{value}</p>
						<p className={styles.desc()}>{desc}</p>
					</div>

					<div className="rounded-lg bg-gray-100 p-3">
						<Icon className="size-5 text-gray-600" aria-hidden="true" />
					</div>
				</div>
			)}
		</Mapper>
	);
}
