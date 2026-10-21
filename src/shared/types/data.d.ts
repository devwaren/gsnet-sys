export type Invoice = {
	id: string;
	customer: string;
	status: "paid" | "pending" | "overdue";
	total: number;
	dueDate: string;
};
