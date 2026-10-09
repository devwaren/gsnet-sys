import { create } from "zustand";
import type { PendingState } from "./types";

let pendingTimeout: ReturnType<typeof setTimeout> | undefined;

export const usePendingStore = create<PendingState>((set) => ({
	isPending: false,

	setIsPending: (isPending) => {
		if (pendingTimeout) {
			clearTimeout(pendingTimeout);
		}

		set({ isPending });

		if (isPending) {
			pendingTimeout = setTimeout(() => {
				set({ isPending: false });
			}, 3000);
		}
	},
}));
