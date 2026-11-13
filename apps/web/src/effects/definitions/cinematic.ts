import type { EffectDefinition, EffectPass } from "@/effects/types";

export const CINEMATIC_SHADER = "cinematic";

function parseIntensity(effectParams: Record<string, unknown>): number {
	const raw = effectParams.intensity;
	return typeof raw === "number" ? raw : Number.parseFloat(String(raw ?? 70));
}

export const cinematicEffectDefinition: EffectDefinition = {
	type: "cinematic",
	name: "Cinematic LUT",
	keywords: ["cinematic", "teal", "orange", "color", "grade", "lut", "film", "mood"],
	params: [
		{
			key: "intensity",
			label: "Intensity",
			type: "number",
			default: 70,
			min: 0,
			max: 100,
			step: 1,
		},
	],
	renderer: {
		passes: [
			{
				shader: CINEMATIC_SHADER,
				uniforms: ({ effectParams }) => ({
					u_intensity: parseIntensity(effectParams),
					u_style: 1, // Teal & orange
				}),
			},
		],
		buildPasses: ({ effectParams }): EffectPass[] => [
			{
				shader: CINEMATIC_SHADER,
				uniforms: {
					u_intensity: parseIntensity(effectParams),
					u_style: 1,
				},
			},
		],
	},
};
