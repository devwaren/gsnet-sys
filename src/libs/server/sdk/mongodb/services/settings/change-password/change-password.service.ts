import { createServerOnlyFn } from "@tanstack/react-start";
import bcrypt from "bcryptjs";
import { ObjectId } from "mongodb";
import { http } from "#/libs/server/constants";
import { invalid, unauthorized } from "#/libs/server/res";
import { collections } from "#/libs/server/sdk/mongodb/collections";
import { schema } from "#/libs/shared/schema";

export const changePassword = createServerOnlyFn(
	async ({ request }: { request: Request }) => {
		const url = new URL(request.url);
		const token = url.searchParams.get("token");

		if (!token) {
			return unauthorized();
		}

		let body: unknown;

		try {
			body = await request.json();
		} catch {
			return invalid();
		}

		const result = schema.auth.resetPassword.safeParse(body);

		if (!result.success) {
			return invalid();
		}

		const { sessions, accounts } = collections;

		const session = await sessions.findOne(
			{ token },
			{
				token: 1,
				userId: 1,
				expiresAt: 1,
			},
		);

		if (!session?.expiresAt || session.expiresAt <= new Date()) {
			return unauthorized();
		}

		const hashedPassword = await bcrypt.hash(result.data.password, 12);

		const account = await accounts.findOneAndUpdate(
			{ userId: new ObjectId(session.userId) },
			{
				$set: {
					password: hashedPassword,
				},
			},
		);

		if (!account) {
			return invalid();
		}

		return Response.json({
			success: true,
			message: "Password updated successfully.",
			statusText: http.responses.status[200],
		});
	},
);
