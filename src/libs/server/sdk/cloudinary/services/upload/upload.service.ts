import { createServerOnlyFn } from "@tanstack/react-start";
import { ObjectId } from "mongodb";
import { http } from "#/libs/server/constants";
import { env } from "#/libs/server/env";
import { cloudinary } from "#/libs/server/sdk/cloudinary/config";
import { collections } from "#/libs/server/sdk/mongodb/collections";
import type { UploadService } from "./types";
import { validate } from "./validations";

const MAX_FILE_SIZE = 5 * 1024 * 1024;

const ALLOWED_IMAGE_TYPES = new Set([
	"image/jpeg",
	"image/png",
	"image/webp",
	"image/gif",
]);

export const upload = createServerOnlyFn<UploadService>(async ({ request }) => {
	const cookieHeader = request.headers.get("cookie");

	const token = cookieHeader
		?.split(";")
		.map((cookie) => cookie.trim())
		.find((cookie) => cookie.startsWith("session_token="))
		?.slice("session_token=".length);

	const contentType = request.headers.get("content-type") ?? "";

	if (!contentType.toLowerCase().startsWith("multipart/form-data")) {
		return Response.json(
			{ success: false, message: "Expected multipart/form-data." },
			{ status: 415 },
		);
	}

	let formData: FormData;

	try {
		formData = await request.formData();
	} catch {
		return Response.json(
			{ success: false, message: "Invalid multipart form data." },
			{ status: 400 },
		);
	}

	const image = formData.get("image");

	if (!(image instanceof File)) {
		return Response.json(
			{ success: false, message: "Please select an image." },
			{ status: 400 },
		);
	}

	if (image.size <= 0) {
		return Response.json(
			{ success: false, message: "The selected image is empty." },
			{ status: 400 },
		);
	}

	if (image.size > MAX_FILE_SIZE) {
		return Response.json(
			{ success: false, message: "Image must not exceed 5 MB." },
			{ status: 413 },
		);
	}

	if (!ALLOWED_IMAGE_TYPES.has(image.type)) {
		return Response.json(
			{ success: false, message: "Unsupported image format." },
			{ status: 415 },
		);
	}

	const [validatedFile, validatedOptions] = await Promise.all([
		validate.file(image),
		validate.options({
			resourceType: "image",
			publicId: env.sdk.cloudinary.apiKey,
		}),
	]);

	if (!validatedFile || !validatedOptions) {
		return Response.json(
			{
				success: false,
				message: "File or upload options failed validation.",
			},
			{ status: 400 },
		);
	}

	try {
		const buffer = Buffer.from(await validatedFile.arrayBuffer());

		const result = await new Promise<
			Awaited<ReturnType<typeof cloudinary.uploader.upload>>
		>((resolve, reject) => {
			const stream = cloudinary.uploader.upload_stream(
				{
					resource_type: "image",
					format: "webp",
					folder: "avatars",
				},
				(error, uploaded) => {
					if (error) {
						reject(error);
						return;
					}

					if (!uploaded) {
						reject(new Error("Upload returned no result."));
						return;
					}

					resolve(uploaded);
				},
			);

			stream.on("error", reject);
			stream.end(buffer);
		});

		const sessions = await collections.sessions.findOne(
			{
				token,
			},
			{
				token: 1,
				userId: 1,
			},
		);

		if (!sessions) {
			return Response.json(
				{
					success: false,
					message: "invalid permission",
					statusText: http.responses.status[401],
				},
				{
					status: 401,
				},
			);
		}

		const user = await collections.users.findOne({
			_id: new ObjectId(sessions.userId),
		});

		if (!user) {
			return Response.json(
				{
					success: false,
					message: "invalid permission",
					statusText: http.responses.status[401],
				},
				{
					status: 401,
				},
			);
		}

		await collections.users.findOneAndUpdate(
			{ _id: user._id },
			{ $set: { avatar: result.secure_url } },
		);

		return Response.json({
			success: true,
			data: {
				secure_url: result.secure_url,
			},
		});
	} catch (error) {
		console.error("[Cloudinary Upload]", error);

		return Response.json(
			{ success: false, message: "Upload failed." },
			{ status: 502 },
		);
	}
});
