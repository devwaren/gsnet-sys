import { useInvoiceFilterStore } from "#/shared/store/filter";
import type { Invoice } from "#/shared/types";
import type { EventInputFn } from "./types";

type Props = {
	invoices: Invoice[];
};

const useSearch = ({ invoices }: Props) => {
	const { search, setSearch } = useInvoiceFilterStore();

	const filteredInvoices = invoices.filter((invoice) => {
		const query = search.trim().toLowerCase();

		return (
			invoice.id.toLowerCase().includes(query) ||
			invoice.customer.toLowerCase().includes(query)
		);
	});

	const handleChange: EventInputFn = (e) => {
		setSearch(e.target.value);
	};

	return { search, setSearch, filteredInvoices, handleChange };
};

export { useSearch };
