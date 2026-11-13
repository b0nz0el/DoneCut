import { effectsRegistry } from "../registry";
import { blurEffectDefinition } from "./blur";
import { glitchEffectDefinition } from "./glitch";
import { rgbSplitEffectDefinition } from "./rgb-split";
import { vhsEffectDefinition } from "./vhs";
import { filmGrainEffectDefinition } from "./film-grain";
import { cinematicEffectDefinition } from "./cinematic";
import { glowEffectDefinition } from "./glow";

const defaultEffects = [
	blurEffectDefinition,
	glitchEffectDefinition,
	rgbSplitEffectDefinition,
	vhsEffectDefinition,
	filmGrainEffectDefinition,
	cinematicEffectDefinition,
	glowEffectDefinition,
];

export function registerDefaultEffects(): void {
	for (const definition of defaultEffects) {
		if (effectsRegistry.has(definition.type)) {
			continue;
		}
		effectsRegistry.register({
			key: definition.type,
			definition,
		});
	}
}

