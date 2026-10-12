import { createServerOnlyFn } from "@tanstack/react-start";
import { cloudinary } from "#/libs/server/sdk/cloudinary/config";
import type { RemoveService } from "./types";
import { validate } from "./validation";

export const remove = createServerOnlyFn<RemoveService>(async ({ request }) => {
	if (request.method !== "DELETE") {
		return Response.json(
			{ success: false, message: "Method not allowed" },
			{
				status: 405,
				headers: { Allow: "DELETE" },
			},
		);
	}

	let body: unknown;

	try {
		body = await request.json();
	} catch {
		return Response.json(
			{ success: false, message: "Invalid JSON request body" },
			{ status: 400 },
		);
	}

	if (
		typeof body !== "object" ||
		body === null ||
		Array.isArray(body) ||
		!("publicId" in body) ||
		!("resourceType" in body)
	) {
		return Response.json(
			{
				success: false,
				message: "Public ID and resource type are required",
			},
			{ status: 400 },
		);
	}

	const { publicId, resourceType } = body;

	const [validatedPublicId, validatedResourceType] = await Promise.all([
		validate.publicId(publicId),
		validate.resourceType(resourceType),
	]);

	if (!validatedPublicId || !validatedResourceType) {
		return Response.json(
			{
				success: false,
				message: "Invalid public ID or resource type",
			},
			{ status: 400 },
		);
	}

	try {
		const result = await cloudinary.uploader.destroy(validatedPublicId, {
			resource_type: validatedResourceType,
			invalidate: true,
		});

		if (result.result !== "ok") {
			return Response.json(
				{
					success: false,
					message: "Cloudinary could not remove the asset",
				},
				{ status: 502 },
			);
		}

		return Response.json({
			success: true,
			data: result,
		});
	} catch {
		return Response.json(
			{ success: false, message: "Asset removal failed" },
			{ status: 502 },
		);
	}
});
