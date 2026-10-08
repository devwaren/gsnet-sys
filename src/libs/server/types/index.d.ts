export type AuthFn = ({ request }: { request: Request }) => Promise<Response>;

export type ReqFn = () => Promise<Response>;
