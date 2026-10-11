import { useLoaderData } from "@tanstack/react-router";

const useSession = () => {
	const { profile, role } = useLoaderData({ from: "/dashboard" });

	return { profile, role };
};

export { useSession };
