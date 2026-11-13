export type TransitionMode = "in" | "out" | "both";

export type TransitionCategory =
	| "Basic"
	| "Dissolve"
	| "Fade"
	| "Motion"
	| "Zoom"
	| "Spin"
	| "Shake"
	| "Glitch";

export interface TransitionPreset {
	id: string;
	name: string;
	category: TransitionCategory;
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
