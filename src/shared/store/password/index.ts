import { create } from "zustand";
import type { PasswordState } from "./types";

const usePasswordStore = create<PasswordState>((set) => ({
	password: false,
	setPassword: (password) => {
		set({ password });
	},
}));

export { usePasswordStore };
