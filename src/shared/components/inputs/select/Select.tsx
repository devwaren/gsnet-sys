import { useInput } from "@dev-waren/react-form-kit/hook-form";
import type { ComponentProps } from "react";
import { styles } from "./styles";

type Props = ComponentProps<"select"> & {
	name: string;
};

export function Select({ name, className, ...props }: Props) {
	const { register, isError, error } = useInput(name);

	return (
		<div className={styles.container()}>
			<div className={styles.selectContainer()}>
				<select {...props} {...register} className={styles.select()} />
			</div>

			{isError && (
				<p role="alert" className={styles.error()}>
					{error}
				</p>
			)}
		</div>
	);
}
