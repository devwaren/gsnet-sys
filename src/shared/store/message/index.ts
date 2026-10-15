import { create } from "zustand";
import type { MessageState } from "./types";

export const useMessageStore = create<MessageState>((set) => ({
	message: "",
	setMessage: (message) => {
		set({ message });

		setTimeout(() => {
			set({ message: "" });
		}, 3000);
	},
}));
