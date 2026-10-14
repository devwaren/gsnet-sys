import { useInput } from "@dev-waren/react-form-kit/hook-form";
import type { ComponentProps } from "react";
import { styles } from "./styles";

type Props = Omit<ComponentProps<"select">, "name"> & {
	name: string;
	placeholder?: string;
	items?: {
		label: string;
		value: string;
	}[];
};

export function Select({
	name,
	items = [],
	placeholder,
	className,
	...props
}: Props) {
	const { register, isError, error } = useInput(name);

	return (
		<div className={styles.container()}>
			<div className={styles.selectContainer()}>
				<select
					{...props}
					{...register}
					className={styles.select({ className })}
				>
					<option value="">{placeholder ?? "Select an option"}</option>

					{items.map((item) => (
						<option key={item.value} value={item.value}>
							{item.label}
						</option>
					))}
				</select>
			</div>

			{isError && (
				<p role="alert" className={styles.error()}>
					{error}
				</p>
			)}
		</div>
	);
}
