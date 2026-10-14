export type HTTPResponse<T> = {
	message: string;
	statusText: string;
	status?: number;
	success: boolean;
	data: T[];
};
