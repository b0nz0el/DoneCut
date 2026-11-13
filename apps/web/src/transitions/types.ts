export type TransitionMode = "in" | "out" | "both";

export interface TransitionPreset {
	id: string;
	name: string;
	category: "Basic" | "Motion" | "Zoom" | "Fade";
	description: string;
	cssClass: string;
	apply: ({
		elementDuration,
		transitionDuration,
		mode,
	}: {
		elementDuration: number; // in seconds
		transitionDuration: number; // in seconds
		mode: TransitionMode;
	}) => Record<string, { time: number; value: number }[]>;
}
