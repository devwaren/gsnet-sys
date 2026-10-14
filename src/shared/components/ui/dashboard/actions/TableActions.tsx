import type { z } from "@dev-waren/react-form-kit";
import { Eye, MoreHorizontal } from "lucide-react";
import { useState } from "react";
import type { schema } from "#/libs/shared/validations";

type ClientRow = z.infer<typeof schema.customer.client> & {
	pppoeId?: string;
};

export function TableActions({
	row,
	onEdit,
}: {
	row: ClientRow;
	onEdit: (client: ClientRow) => void;
}) {
	const [open, setOpen] = useState(false);

	return (
		<div className="relative flex justify-end">
			<button
				type="button"
				aria-label={`Actions for ${String(row.pppoeId ?? "client")}`}
				aria-expanded={open}
				onClick={() => setOpen((prev) => !prev)}
				className="rounded-md p-2 text-gray-500 transition hover:bg-gray-100 hover:text-gray-900"
			>
				<MoreHorizontal size={18} />
			</button>

			{open && (
				<>
					<button
						type="button"
						aria-label="Close client actions"
						className="fixed inset-0 z-10 cursor-default"
						onClick={() => setOpen(false)}
					/>

					<div className="absolute right-0 top-full z-20 mt-1 w-36 rounded-lg border border-gray-200 bg-white p-1 shadow-lg">
						<button
							type="button"
							onClick={() => {
								setOpen(false);
								onEdit(row);
							}}
							className="flex w-full items-center gap-2 rounded-md px-3 py-2 text-sm text-gray-700 hover:bg-gray-100"
						>
							<Eye size={15} />
							View
						</button>
					</div>
				</>
			)}
		</div>
	);
}
