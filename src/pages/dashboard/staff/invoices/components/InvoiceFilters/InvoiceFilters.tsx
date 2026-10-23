import { Mapper } from "@dev-waren/react-form-kit";
import { Search } from "lucide-react";
import type { Invoice } from "#/shared/types";
import { InvoiceCard } from "./components";
import { useSearch } from "./hooks";
import { styles } from "./styles";

type Props = {
	invoices: Invoice[];
};

export function InvoiceFilters({ invoices }: Props) {
	const { search, filteredInvoices, handleChange } = useSearch({
		invoices,
	});

	return (
		<div className="w-full space-y-4">
			<div className={styles.card()}>
				<Search size={20} className="shrink-0" />

				<input
					type="text"
					value={search}
					onChange={handleChange}
					placeholder="Search invoice or client's name"
					aria-label="Search invoices"
					className={styles.input()}
				/>
			</div>

			<Mapper
				listFor="filter cards"
				items={filteredInvoices}
				className={styles.invoiceCards()}
			>
				{(item: Invoice) => <InvoiceCard data={item} />}
			</Mapper>
		</div>
	);
}
