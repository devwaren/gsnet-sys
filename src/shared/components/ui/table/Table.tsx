import { Mapper } from "@dev-waren/react-form-kit";
import { ArrowRight } from "lucide-react";
import { AnimatePresence, motion } from "motion/react";
import type { ReactNode } from "react";

type Column<T> = {
	key: keyof T | string;
	label: string;
	render?: (row: T) => ReactNode;
	className?: string;
};

type Props<T> = {
	label: string;
	desc: string;
	columns: Column<T>[];
	data: T[];
	actionLabel?: string;
	onAction?: () => void;
	emptyMessage?: string;
};

function getRowKey<T>(row: T, fallbackIndex: number) {
	if (row && typeof row === "object") {
		const record = row as Record<string, unknown>;
		const id = record.id ?? record.uuid ?? record._id;

		if (id !== undefined && id !== null) {
			return String(id);
		}
	}

	return `${JSON.stringify(row)}-${fallbackIndex}`;
}

function getValue<T>(row: T, key: string): unknown {
	return key.split(".").reduce<unknown>((value, part) => {
		if (value && typeof value === "object") {
			return (value as Record<string, unknown>)[part];
		}

		return undefined;
	}, row);
}

function isImageColumn(key: string, value: unknown): value is string {
	return (
		typeof value === "string" &&
		/^(https?:\/\/|\/)/i.test(value) &&
		/(avatar|image|thumbnail|photo|picture|logo)/i.test(key)
	);
}

function CellValue<T>({ row, column }: { row: T; column: Column<T> }) {
	const key = String(column.key);
	const value = getValue(row, key);

	if (column.render) {
		return <>{column.render(row)}</>;
	}

	if (isImageColumn(key, value)) {
		return (
			<img
				src={value}
				alt={column.label}
				loading="lazy"
				className="size-10 rounded-lg border border-gray-200 object-cover"
			/>
		);
	}

	if (value === null || value === undefined || value === "") {
		return <>—</>;
	}

	return <>{value as ReactNode}</>;
}

export default function Table<T>({
	label,
	desc,
	columns,
	data,
	actionLabel,
	onAction,
	emptyMessage = "No records found.",
}: Props<T>) {
	return (
		<motion.section
			initial={{ opacity: 0, y: 10 }}
			animate={{ opacity: 1, y: 0 }}
			transition={{ duration: 0.3, ease: "easeOut" }}
			className="min-w-0 overflow-hidden rounded-2xl border border-gray-200/80 bg-white shadow-sm"
		>
			{/* Header */}
			<div className="flex flex-wrap items-center justify-between gap-3 p-4 sm:p-5">
				<div className="min-w-0">
					<h2 className="text-base font-semibold text-gray-900">{label}</h2>
					<p className="mt-1 text-sm text-gray-500">{desc}</p>
				</div>

				{actionLabel && onAction && (
					<button
						type="button"
						onClick={onAction}
						className="inline-flex shrink-0 items-center gap-2 rounded-lg border border-gray-200 px-3 py-2 text-xs font-medium text-gray-700 transition hover:bg-gray-50"
					>
						{actionLabel}
						<ArrowRight size={14} />
					</button>
				)}
			</div>

			{/* Mobile cards */}
			<div className="space-y-3 p-3 sm:hidden">
				<AnimatePresence mode="popLayout" initial={false}>
					{data.length > 0 ? (
						data.map((row, index) => {
							const rowKey = getRowKey(row, index);

							return (
								<motion.article
									key={rowKey}
									layout
									initial={{ opacity: 0, y: 8 }}
									animate={{ opacity: 1, y: 0 }}
									exit={{ opacity: 0, y: -8 }}
									transition={{ duration: 0.2 }}
									className="min-w-0 rounded-xl border border-gray-200 bg-white p-4"
								>
									<div className="space-y-3">
										{columns.map((column) => (
											<div
												key={String(column.key)}
												className={`flex min-w-0 items-start justify-between gap-4 ${
													column.key === "actions"
														? "border-t border-gray-100 pt-3"
														: ""
												}`}
											>
												<span className="shrink-0 text-xs text-gray-500">
													{column.label || "Actions"}
												</span>

												<span
													className={`min-w-0 warp-break-words text-right text-sm font-medium text-gray-900 ${
														column.className ?? ""
													}`}
												>
													<CellValue row={row} column={column} />
												</span>
											</div>
										))}
									</div>
								</motion.article>
							);
						})
					) : (
						<motion.p
							key="mobile-empty"
							initial={{ opacity: 0 }}
							animate={{ opacity: 1 }}
							className="px-4 py-10 text-center text-sm text-gray-500"
						>
							{emptyMessage}
						</motion.p>
					)}
				</AnimatePresence>
			</div>

			{/* Desktop and tablet table */}
			<div className="hidden overflow-x-auto sm:block">
				<table className="w-full min-w-175 text-left text-xs">
					<motion.thead
						initial={{ opacity: 0 }}
						animate={{ opacity: 1 }}
						transition={{ duration: 0.25, delay: 0.1 }}
						className="bg-gray-50 text-gray-500"
					>
						<Mapper listFor="columns" items={columns} as="tr">
							{(column) => (
								<th
									className={`whitespace-nowrap px-4 py-3 font-medium ${
										column.className ?? ""
									}`}
								>
									{column.label}
								</th>
							)}
						</Mapper>
					</motion.thead>

					<tbody className="divide-y divide-gray-100">
						<AnimatePresence mode="popLayout" initial={false}>
							{data.length > 0 ? (
								data.map((row, index) => (
									<Mapper
										key={getRowKey(row, index)}
										listFor="columns"
										items={columns}
										as="tr"
										className="transition hover:bg-gray-50/70"
									>
										{(column) => (
											<td
												className={`whitespace-nowrap px-4 py-3.5 text-gray-700 ${
													column.className ?? ""
												}`}
											>
												<CellValue row={row} column={column} />
											</td>
										)}
									</Mapper>
								))
							) : (
								<motion.tr
									key="desktop-empty"
									initial={{ opacity: 0 }}
									animate={{ opacity: 1 }}
									exit={{ opacity: 0 }}
								>
									<td
										colSpan={columns.length}
										className="px-4 py-10 text-center text-sm text-gray-500"
									>
										{emptyMessage}
									</td>
								</motion.tr>
							)}
						</AnimatePresence>
					</tbody>
				</table>
			</div>
		</motion.section>
	);
}
