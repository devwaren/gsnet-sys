import { RefreshCw } from "lucide-react";
import { useInputGen } from "./hooks";
import { styles } from "./styles";

export function ButtonGenerator({ name }: { name: string }) {
	const { isGenerating, handleGenerateJWT } = useInputGen(name);

	return (
		<button
			type="button"
			onClick={handleGenerateJWT}
			disabled={isGenerating}
			className={styles.button()}
		>
			<RefreshCw size={16} className={isGenerating ? "animate-spin" : ""} />
			{isGenerating ? "Generating..." : "Generate JWT"}
		</button>
	);
}
