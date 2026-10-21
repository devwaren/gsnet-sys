import { sanitize } from "@dev-waren/react-form-kit";
import { create } from "zustand";
import type { InvoiceFilterState } from "./types";

const useInvoiceFilterStore = create<InvoiceFilterState>((set) => ({
	search: "",
	status: "all",

	setSearch: (search) => set({ search: sanitize(search) }),
	setStatus: (status) => set({ status }),

	resetFilters: () => set({ search: "", status: "all" }),
}));

export { useInvoiceFilterStore };
