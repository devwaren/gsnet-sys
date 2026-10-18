export type TriggerState = {
	triggers: Record<string, number>;
	setTrigger: (id: string, trigger?: boolean) => void;
};
