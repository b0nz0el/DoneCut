import type { EffectDefinition, EffectPass } from "@/effects/types";

export const RGB_SPLIT_SHADER = "rgb-split";

function parseDistance(effectParams: Record<string, unknown>): number {
	const raw = effectParams.distance;
	return typeof raw === "number" ? raw : Number.parseFloat(String(raw ?? 12));
}

export const rgbSplitEffectDefinition: EffectDefinition = {
	type: "rgb-split",
	name: "RGB Split",
	keywords: ["chromatic", "aberration", "rgb", "split", "color", "shift"],
	params: [
		{
			key: "distance",
			label: "Distance",
			type: "number",
			default: 12,
			min: 0,
			max: 50,
			step: 1,
		},
	],
	renderer: {
		passes: [
			{
				shader: RGB_SPLIT_SHADER,
				uniforms: ({ effectParams }) => ({
					u_distance: parseDistance(effectParams),
				}),
			},
		],
		buildPasses: ({ effectParams }): EffectPass[] => [
			{
				shader: RGB_SPLIT_SHADER,
				uniforms: {
					u_distance: parseDistance(effectParams),
				},
			},
		],
	},
};
