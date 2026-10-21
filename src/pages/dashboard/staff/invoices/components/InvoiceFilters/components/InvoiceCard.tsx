import { cn } from "@dev-waren/react-form-kit";
import type { Invoice } from "#/shared/types";
import { statusStyles } from "./constants";
import { styles } from "./styles";

type Props = {
	data: Invoice;
};

export function InvoiceCard({ data }: Props) {
	return (
		<article className={styles.article()}>
			<div className={styles.invoiceContent()}>
				<div className="min-w-0 space-y-1">
					<p className={styles.invoiceText()}>Invoice</p>
					<h3 className={styles.h3()}>{data.id}</h3>
				</div>

				<span className={cn(styles.status(), statusStyles[data.status])}>
					{data.status}
				</span>
			</div>

			<div className="space-y-1">
				<p className={styles.customerText()}>{data.customer}</p>
				<p className={styles.date()}>
					{data.total.toLocaleString("en-PH", {
						style: "currency",
						currency: "PHP",
					})}
				</p>
			</div>

			<div className={styles.dueDate()}>
				<span className="text-xs text-gray-500">Due date</span>
				<time dateTime={data.dueDate} className={styles.time()}>
					{data.dueDate}
				</time>
			</div>
		</article>
	);
}
