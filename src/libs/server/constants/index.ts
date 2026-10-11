const responses = {
	status: {
		200: "Success",
		201: "Created",
		400: "Bad Request",
		401: "Unauthorized",
		403: "Forbidden",
		404: "Not Found",
		409: "Conflict",
		422: "Unprocessable Entity",
		429: "Too Many Requests",
		500: "Internal Server Error",
	},

	messages: {
		loggedIn: "Successfully logged in.",
		loggedOut: "Successfully logged out.",
		emailExists: "Email already exists.",
		registered: "Successfully Registered.",
		invalid: "Invalid email or password.",
		incorrectData: "Invalid data.",
		registerFailed: "Registration failed.",
		unauthorized: "Unauthorized.",
		invalidSession: "Invalid session.",
	},
} as const;

export const http = {
	responses,
} as const;
