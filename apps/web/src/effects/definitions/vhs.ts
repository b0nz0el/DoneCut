import type { EffectDefinition, EffectPass } from "@/effects/types";

export const VHS_SHADER = "vhs";

function parseIntensity(effectParams: Record<string, unknown>): number {
	const raw = effectParams.intensity;
	return typeof raw === "number" ? raw : Number.parseFloat(String(raw ?? 50));
}

export const vhsEffectDefinition: EffectDefinition = {
	type: "vhs",
	name: "VHS Retro",
	keywords: ["vhs", "retro", "90s", "tape", "vintage", "analog", "scanlines"],
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
				shader: VHS_SHADER,
				uniforms: ({ effectParams }) => ({
					u_intensity: parseIntensity(effectParams),
				}),
			},
		],
		buildPasses: ({ effectParams }): EffectPass[] => [
			{
				shader: VHS_SHADER,
				uniforms: {
					u_intensity: parseIntensity(effectParams),
				},
			},
		],
	},
};
