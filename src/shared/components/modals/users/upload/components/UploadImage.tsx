import { ImagePlus, X } from "lucide-react";
import { useUploadImage } from "./hooks";
import { styles } from "./styles";

type UploadImageProps = {
	accept?: string;
	maxSizeMB?: number;
};

export function UploadImage({
	accept = "image/png,image/jpeg,image/webp,image/gif",
	maxSizeMB = 5,
}: UploadImageProps) {
	const {
		inputRef,
		preview,
		fileName,
		isDragging,
		error,
		handleInputChange,
		handleDragOver,
		handleDragLeave,
		handleDrop,
		removeImage,
	} = useUploadImage({ maxSizeMB });

	return (
		<div className={styles.root}>
			<input
				ref={inputRef}
				type="file"
				accept={accept}
				className={styles.input}
				onChange={handleInputChange}
			/>

			<div className={styles.wrapper}>
				<button
					type="button"
					onClick={() => inputRef.current?.click()}
					onDragOver={handleDragOver}
					onDragLeave={handleDragLeave}
					onDrop={handleDrop}
					className={styles.button({
						state: isDragging ? "dragging" : "idle",
					})}
				>
					{preview ? (
						<>
							<img src={preview} alt={fileName} className={styles.preview} />
							<p className={styles.fileName}>{fileName}</p>
						</>
					) : (
						<>
							<ImagePlus size={36} className={styles.icon} />
							<p className={styles.title}>Drag and drop an image here</p>
							<p className={styles.description}>
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
						className={styles.remove}
					>
						<X size={16} />
					</button>
				)}
			</div>

			{error && (
				<p role="alert" className={styles.error}>
					{error}
				</p>
			)}
		</div>
	);
}
