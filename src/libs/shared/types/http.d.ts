export type HTTPResponse<T = unknown> = {
	message: string;
	statusText: string;
	status?: number;
	success: boolean;
	data?: Partial<T>[];
};
