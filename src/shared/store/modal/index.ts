import { create } from "zustand";
import type { ModalState } from "./types";

export const useModalStore = create<ModalState>((set) => ({
	isModal: false,
	setIsModal: (isModal) => set({ isModal }),
}));
