import { create } from "zustand";
import type { ErrorState } from "./types";

export const useErrorState = create<ErrorState>((set) => ({
	error: "",
	setError: (error) => {
		set({ error });

		setTimeout(() => {
			set({ error: "" });
		}, 3000);
	},
}));
