export type UploadService = ({
	request,
}: {
	request: Request;
}) => Promise<Response>;
