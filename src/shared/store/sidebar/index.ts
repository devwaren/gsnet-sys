import { create } from "zustand";
import type { SidebarStore } from "./types";

export const useSidebarStore = create<SidebarStore>((set) => ({
	isOpen: false,
	toggleSidebar: () => set((state) => ({ isOpen: !state.isOpen })),
	closeSidebar: () => set({ isOpen: false }),
}));
