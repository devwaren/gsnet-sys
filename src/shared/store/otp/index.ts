import { create } from "zustand";

type OtpState = {
	clear: number;
	clearOtp: () => void;
};

export const useOtpStore = create<OtpState>((set) => ({
	clear: 0,

	clearOtp: () => {
		set((state) => ({
			clear: state.clear + 1,
		}));
	},
}));
