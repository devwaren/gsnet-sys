export type InvoiceStatus = "paid" | "pending" | "overdue" | "all";

export type InvoiceFilterState = {
	search: string;
	status: InvoiceStatus;
	setSearch: (search: string) => void;
	setStatus: (status: InvoiceStatus) => void;
	resetFilters: () => void;
};
