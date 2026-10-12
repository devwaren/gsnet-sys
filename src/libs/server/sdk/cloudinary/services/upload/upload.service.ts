import { createServerOnlyFn } from "@tanstack/react-start";
import { cloudinary } from "#/libs/server/sdk/cloudinary/config";
import type { UploadService } from "./types";
import { validate } from "./validations";

export const upload = createServerOnlyFn<UploadService>(async ({ request }) => {
	if (request.method !== "POST") {
		return Response.json(
			{ success: false, message: "Method not allowed" },
			{ status: 405, headers: { Allow: "POST" } },
		);
	}

	if (
		!request.headers
			.get("content-type")
			?.toLowerCase()
			.startsWith("multipart/form-data")
	) {
		return Response.json(
			{ success: false, message: "Expected multipart/form-data" },
			{ status: 415 },
		);
	}

	let formData: FormData;

	try {
		formData = await request.formData();
	} catch {
		return Response.json(
			{ success: false, message: "Invalid multipart request" },
			{ status: 400 },
		);
	}

	const file = formData.get("file");
	const rawOptions = formData.get("options");

	if (!(file instanceof File)) {
		return Response.json(
			{ success: false, message: "A valid file is required" },
			{ status: 400 },
		);
	}

	let options: unknown = {};

	if (rawOptions !== null) {
		if (typeof rawOptions !== "string") {
			return Response.json(
				{ success: false, message: "Invalid upload options" },
				{ status: 400 },
			);
		}

		try {
			options = JSON.parse(rawOptions);
		} catch {
			return Response.json(
				{ success: false, message: "Invalid upload options" },
				{ status: 400 },
			);
		}
	}

	const [validatedFile, validatedOptions] = await Promise.all([
		validate.file(file),
		validate.options(options),
	]);

	if (!validatedFile || !validatedOptions) {
		return Response.json(
			{ success: false, message: "File or upload options failed validation" },
			{ status: 400 },
		);
	}

	try {
		const buffer = Buffer.from(await validatedFile.arrayBuffer());

		const result = await new Promise((resolve, reject) => {
			const stream = cloudinary.uploader.upload_stream(
				{
					...validatedOptions,
					resource_type: "auto",
				},
				(error, result) => {
					if (error) return reject(error);
					if (!result) return reject(new Error("Upload returned no result"));

					resolve(result);
				},
			);

			stream.on("error", reject);
			stream.end(buffer);
		});

		return Response.json({ success: true, data: result });
	} catch {
		return Response.json(
			{ success: false, message: "Upload failed" },
			{ status: 502 },
		);
	}
});
