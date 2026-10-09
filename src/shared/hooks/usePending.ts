import { useEffect } from "react";
import { usePendingStore } from "#/shared/store/pending";

const usePending = (isPending: boolean) => {
	const { setIsPending } = usePendingStore();

	useEffect(() => {
		setIsPending(isPending);
	}, [isPending, setIsPending]);
};

export { usePending };
