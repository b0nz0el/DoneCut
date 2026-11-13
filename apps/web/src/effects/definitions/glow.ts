import type { EffectDefinition, EffectPass } from "@/effects/types";

export const GLOW_SHADER = "glow";

function parseIntensity(effectParams: Record<string, unknown>): number {
	const raw = effectParams.intensity;
	return typeof raw === "number" ? raw : Number.parseFloat(String(raw ?? 50));
}

export const glowEffectDefinition: EffectDefinition = {
	type: "glow",
	name: "Soft Glow",
	keywords: ["glow", "bloom", "light", "shine", "soft", "bright"],
	params: [
		{
			key: "intensity",
			label: "Intensity",
			type: "number",
			default: 50,
			min: 0,
			max: 100,
			step: 1,
		},
	],
	renderer: {
		passes: [
			{
				shader: GLOW_SHADER,
				uniforms: ({ effectParams }) => ({
					u_intensity: parseIntensity(effectParams),
				}),
			},
		],
		buildPasses: ({ effectParams }): EffectPass[] => [
			{
				shader: GLOW_SHADER,
				uniforms: {
					u_intensity: parseIntensity(effectParams),
				},
			},
		],
	},
};
