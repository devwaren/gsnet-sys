import type { ChangeEvent } from "react";
import type { Invoice } from "#/shared/types";

export type InvoiceStatus = "paid" | "pending" | "overdue";

export type UseInvoiceFilterOptions = {
	invoices: Invoice[];
};

export type EventInputFn = (e: ChangeEvent<HTMLInputElement>) => void;
