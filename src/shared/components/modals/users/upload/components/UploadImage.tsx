import { ImagePlus, X } from "lucide-react";
import { useEffect, useRef, useState } from "react";
import { useFormContext } from "react-hook-form";

type UploadImageProps = {
	accept?: string;
	maxSizeMB?: number;
};

export function UploadImage({
	accept = "image/png,image/jpeg,image/webp,image/gif",
	maxSizeMB = 5,
}: UploadImageProps) {
	const inputRef = useRef<HTMLInputElement>(null);
	const [preview, setPreview] = useState<string | null>(null);
	const [fileName, setFileName] = useState("");
	const [isDragging, setIsDragging] = useState(false);
	const [error, setError] = useState("");

	const { setValue, clearErrors } = useFormContext<{ image: File }>();

	useEffect(() => {
		return () => {
			if (preview) URL.revokeObjectURL(preview);
		};
	}, [preview]);

	const handleFile = (file?: File) => {
		if (!file) return;

		if (
			!["image/jpeg", "image/png", "image/webp", "image/gif"].includes(
				file.type,
			)
		) {
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

		if (preview) URL.revokeObjectURL(preview);

		setError("");
		clearErrors("image");
		setPreview(URL.createObjectURL(file));
		setFileName(file.name);

		setValue("image", file, {
			shouldDirty: true,
			shouldTouch: true,
			shouldValidate: true,
		});
	};

	const removeImage = () => {
		if (preview) URL.revokeObjectURL(preview);

		setPreview(null);
		setFileName("");
		setError("");

		setValue("image", undefined as unknown as File, {
			shouldDirty: true,
			shouldTouch: true,
			shouldValidate: true,
		});

		if (inputRef.current) {
			inputRef.current.value = "";
		}
	};

	return (
		<div className="w-full space-y-2">
			<input
				ref={inputRef}
				type="file"
				accept={accept}
				className="hidden"
				onChange={(event) => {
					handleFile(event.target.files?.[0]);
					event.target.value = "";
				}}
			/>

			<div className="relative">
				<button
					type="button"
					onClick={() => inputRef.current?.click()}
					onDragOver={(event) => {
						event.preventDefault();
						setIsDragging(true);
					}}
					onDragLeave={() => setIsDragging(false)}
					onDrop={(event) => {
						event.preventDefault();
						setIsDragging(false);
						handleFile(event.dataTransfer.files?.[0]);
					}}
					className={`flex min-h-48 w-full cursor-pointer flex-col
            items-center justify-center overflow-hidden rounded-xl
            border-2 border-dashed p-6 transition-colors ${
							isDragging
								? "border-blue-500 bg-blue-50"
								: "border-gray-300 hover:border-blue-400"
						}`}
				>
					{preview ? (
						<>
							<img
								src={preview}
								alt={fileName}
								className="pointer-events-none max-h-64 max-w-full rounded-lg object-contain"
							/>
							<p className="mt-3 max-w-full truncate text-sm text-gray-600">
								{fileName}
							</p>
						</>
					) : (
						<>
							<ImagePlus size={36} className="mb-3 text-gray-400" />
							<p className="text-sm font-medium text-gray-700">
								Drag and drop an image here
							</p>
							<p className="mt-1 text-xs text-gray-500">
								or click to browse · Max {maxSizeMB} MB
							</p>
						</>
					)}
				</button>

				{preview && (
					<button
						type="button"
						aria-label="Remove image"
						onClick={removeImage}
						className="absolute right-3 top-3 rounded-full bg-black/70 p-2 text-white hover:bg-black"
					>
						<X size={16} />
					</button>
				)}
			</div>

			{error && (
				<p role="alert" className="text-sm text-red-500">
					{error}
				</p>
			)}
		</div>
	);
}
