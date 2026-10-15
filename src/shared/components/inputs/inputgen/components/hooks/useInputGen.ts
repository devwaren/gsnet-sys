import { useRef, useState } from "react";
import { useFormContext } from "react-hook-form";
import { generateJWT } from "#/libs/client/gen";

const useInputGen = (name: string) => {
	const inputRef = useRef<HTMLInputElement>(null);
	const [isGenerating, setIsGenerating] = useState(false);
	const { setValue } = useFormContext();

	const handleGenerateJWT = async () => {
		if (isGenerating) return;

		setIsGenerating(true);

		try {
			const { token } = await generateJWT();

			setValue(name, token, {
				shouldDirty: true,
				shouldValidate: true,
			});
		} catch (error) {
			console.error("Failed to generate JWT:", error);
		} finally {
			setIsGenerating(false);
		}
	};

	return { inputRef, handleGenerateJWT, isGenerating, setIsGenerating };
};

export { useInputGen };
