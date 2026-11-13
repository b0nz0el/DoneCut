import type { EffectDefinition, EffectPass } from "@/effects/types";

export const GLITCH_SHADER = "glitch";

function parseIntensity(effectParams: Record<string, unknown>): number {
	const raw = effectParams.intensity;
	return typeof raw === "number" ? raw : Number.parseFloat(String(raw ?? 25));
}

export const glitchEffectDefinition: EffectDefinition = {
	type: "glitch",
	name: "Glitch",
	keywords: ["glitch", "distortion", "cyber", "digital", "noise"],
	params: [
		{
			key: "intensity",
			label: "Intensity",
			type: "number",
			default: 25,
			min: 0,
			max: 100,
			step: 1,
		},
	],
	renderer: {
		passes: [
			{
				shader: GLITCH_SHADER,
				uniforms: ({ effectParams }) => ({
					u_intensity: parseIntensity(effectParams),
				}),
			},
		],
		buildPasses: ({ effectParams }): EffectPass[] => [
			{
				shader: GLITCH_SHADER,
				uniforms: {
					u_intensity: parseIntensity(effectParams),
				},
			},
		],
	},
};
