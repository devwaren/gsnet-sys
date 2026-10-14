import { create } from "zustand";
import type { SelectionState } from "./types";

export const useSelectionStore = create<SelectionState>((set) => ({
	selection: [],

	setSelection: (selection) =>
		set((state) => ({
			selection: [...state.selection, selection],
		})),

	clearSelection: () => set({ selection: [] }),
}));
