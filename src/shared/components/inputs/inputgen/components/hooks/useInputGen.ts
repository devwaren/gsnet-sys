import { useRef, useState } from "react";
import { useFormContext } from "react-hook-form";
import { useErrorStore } from "#/shared/store/error";
import { useMessageStore } from "#/shared/store/message";
import { useGetJwt } from "./useGetJwt";

const useInputGen = (name: string) => {
	const inputRef = useRef<HTMLInputElement>(null);
	const [isGenerating, setIsGenerating] = useState(false);
	const { setValue } = useFormContext();
	const { refetch } = useGetJwt();
	const { setError } = useErrorStore();
	const { setMessage } = useMessageStore();

	const handleGenerateJWT = async () => {
		if (isGenerating) return;

		setIsGenerating(true);

		try {
			const { data, error } = await refetch();

			if (error) throw error;

			setValue(name, data?.token, {
				shouldDirty: true,
				shouldValidate: true,
			});

			setMessage(String(data?.message));
		} catch (error) {
			console.error("Failed to rotate JWT:", error);

			setError(
				error instanceof Error ? error.message : "Failed to rotate JWT.",
			);
		} finally {
			setIsGenerating(false);
		}
	};

	return {
		inputRef,
		handleGenerateJWT,
		isGenerating,
		setIsGenerating,
	};
};

export { useInputGen };
