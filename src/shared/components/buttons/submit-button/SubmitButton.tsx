import type { ComponentProps } from "react";
import { useErrorStore } from "#/shared/store/error";
import { usePendingStore } from "#/shared/store/pending";

type Props = ComponentProps<"button"> & {
	loadinglabel: string;
	label: string;
};

export function SubmitButton({ loadinglabel, label, ...props }: Props) {
	const { error } = useErrorStore();
	const { isPending } = usePendingStore();

	return (
		<div>
			<button
				{...props}
				type="submit"
				className=" px-4 py-2 text-sm bg-green-200 rounded-lg w-full"
			>
				{isPending ? `${loadinglabel}...` : label}
			</button>

			{error && <p className="text-red-400">{error}</p>}
		</div>
	);
}
