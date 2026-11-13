import type { EffectDefinition, EffectPass } from "@/effects/types";

export const FILM_GRAIN_SHADER = "film-grain";

function parseIntensity(effectParams: Record<string, unknown>): number {
	const raw = effectParams.intensity;
	return typeof raw === "number" ? raw : Number.parseFloat(String(raw ?? 35));
}

export const filmGrainEffectDefinition: EffectDefinition = {
	type: "film-grain",
	name: "Film Grain",
	keywords: ["film", "grain", "cinema", "vintage", "analog", "texture"],
	params: [
		{
			key: "intensity",
			label: "Intensity",
			type: "number",
			default: 35,
			min: 0,
			max: 100,
			step: 1,
		},
	],
	renderer: {
		passes: [
			{
				shader: FILM_GRAIN_SHADER,
				uniforms: ({ effectParams }) => ({
					u_intensity: parseIntensity(effectParams),
				}),
			},
		],
		buildPasses: ({ effectParams }): EffectPass[] => [
			{
				shader: FILM_GRAIN_SHADER,
				uniforms: {
					u_intensity: parseIntensity(effectParams),
				},
			},
		],
	},
};
