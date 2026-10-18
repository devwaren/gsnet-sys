import { create } from "zustand";

type TriggerState = {
	triggers: Record<string, number>;
	setTrigger: (id: string) => void;
};

export const useTriggerStore = create<TriggerState>((set) => ({
	triggers: {},

	setTrigger: (id) =>
		set((state) => ({
			triggers: {
				...state.triggers,
				[id]: (state.triggers[id] ?? 0) + 1,
			},
		})),
}));
