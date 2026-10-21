import { useMemo } from "react";
import { useInvoiceFilterStore } from "#/shared/store/filter";
import type { UseInvoiceFilterOptions } from "./types";

const useInvoiceFilter = ({ invoices }: UseInvoiceFilterOptions) => {
	const { search, status, setSearch, setStatus, resetFilters } =
		useInvoiceFilterStore();

	const filteredInvoices = useMemo(() => {
		const query = search.trim().toLowerCase();

		return invoices.filter((invoice) => {
			const matchesSearch =
				invoice.id.toLowerCase().includes(query) ||
				invoice.customer.toLowerCase().includes(query);

			const matchesStatus = status === "all" || invoice.status === status;

			return matchesSearch && matchesStatus;
		});
	}, [invoices, search, status]);

	return {
		search,
		status,
		setSearch,
		setStatus,
		filteredInvoices,
		resetFilters,
	};
};

export { useInvoiceFilter };
