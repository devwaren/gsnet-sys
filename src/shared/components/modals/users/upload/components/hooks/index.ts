import { useCallback, useEffect, useRef, useState } from "react";
import { useFormContext } from "react-hook-form";

type UseUploadImageOptions = {
	maxSizeMB?: number;
};

const ALLOWED_TYPES = ["image/jpeg", "image/png", "image/webp", "image/gif"];

export function useUploadImage({ maxSizeMB = 5 }: UseUploadImageOptions = {}) {
	const inputRef = useRef<HTMLInputElement>(null);
	const previewRef = useRef<string | null>(null);

	const [preview, setPreview] = useState<string | null>(null);
	const [fileName, setFileName] = useState("");
	const [isDragging, setIsDragging] = useState(false);
	const [error, setError] = useState("");

	const { setValue, clearErrors } = useFormContext<{
		image?: File;
	}>();

	const clearPreview = useCallback(() => {
		if (previewRef.current) {
			URL.revokeObjectURL(previewRef.current);
			previewRef.current = null;
		}

		setPreview(null);
	}, []);

	useEffect(() => {
		return () => {
			if (previewRef.current) {
				URL.revokeObjectURL(previewRef.current);
			}
		};
	}, []);

	const handleFile = useCallback(
		(file?: File) => {
			if (!file) return;

			if (!ALLOWED_TYPES.includes(file.type)) {
				setError("Only JPEG, PNG, WebP, and GIF images are allowed.");
				return;
			}

			if (file.size === 0) {
				setError("Image cannot be empty.");
				return;
			}

			if (file.size > maxSizeMB * 1024 * 1024) {
				setError(`Image must be ${maxSizeMB} MB or smaller.`);
				return;
			}

			clearPreview();

			const objectUrl = URL.createObjectURL(file);
			previewRef.current = objectUrl;

			setPreview(objectUrl);
			setFileName(file.name);
			setError("");
			clearErrors("image");

			setValue("image", file, {
				shouldDirty: true,
				shouldTouch: true,
				shouldValidate: true,
			});
		},
		[clearErrors, clearPreview, maxSizeMB, setValue],
	);

	const removeImage = useCallback(() => {
		clearPreview();
		setFileName("");
		setError("");

		setValue("image", undefined, {
			shouldDirty: true,
			shouldTouch: true,
			shouldValidate: true,
		});

		if (inputRef.current) {
			inputRef.current.value = "";
		}
	}, [clearPreview, setValue]);

	const handleInputChange = useCallback(
		(event: React.ChangeEvent<HTMLInputElement>) => {
			handleFile(event.target.files?.[0]);
			event.target.value = "";
		},
		[handleFile],
	);

	const handleDragOver = useCallback(
		(event: React.DragEvent<HTMLButtonElement>) => {
			event.preventDefault();
			setIsDragging(true);
		},
		[],
	);

	const handleDragLeave = useCallback(() => {
		setIsDragging(false);
	}, []);

	const handleDrop = useCallback(
		(event: React.DragEvent<HTMLButtonElement>) => {
			event.preventDefault();
			setIsDragging(false);
			handleFile(event.dataTransfer.files?.[0]);
		},
		[handleFile],
	);

	return {
		inputRef,
		preview,
		fileName,
		isDragging,
		error,
		handleInputChange,
		handleDragOver,
		handleDragLeave,
		handleDrop,
		handleFile,
		removeImage,
	};
}
