import { Mapper } from "@dev-waren/react-form-kit";
import type { FormField } from "#/shared/types";
import { Switcher } from "./components";
import { styles } from "./styles";

type Props = {
	fields: FormField[];
};

export function FormBuilder({ fields }: Props) {
	return (
		<Mapper listFor="fields" items={fields} className={styles.container()}>
			{(field) => <Switcher {...field} />}
		</Mapper>
	);
}
