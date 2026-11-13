import type { TransitionPreset } from "./types";

export const TRANSITION_PRESETS: TransitionPreset[] = [
	// ==================== DISSOLVE & FADE ====================
	{
		id: "fade",
		name: "Cross Dissolve",
		category: "Dissolve",
		description: "Pudar halus antar klip",
		cssClass: "animate-fade",
		apply: ({ elementDuration, transitionDuration, mode }) => {
			const t = Math.min(transitionDuration, elementDuration / 2);
			const channels: Record<string, { time: number; value: number }[]> = {};
			const opacityKeys: { time: number; value: number }[] = [];

			if (mode === "in" || mode === "both") {
				opacityKeys.push({ time: 0, value: 0 });
				opacityKeys.push({ time: t, value: 1 });
			}
			if (mode === "out" || mode === "both") {
				opacityKeys.push({ time: elementDuration - t, value: 1 });
				opacityKeys.push({ time: elementDuration, value: 0 });
			}
			channels["opacity"] = opacityKeys;
			return channels;
		},
	},
	{
		id: "dip-black",
		name: "Dip to Black",
		category: "Fade",
		description: "Pudar lewat layar gelap",
		cssClass: "animate-dip-black",
		apply: ({ elementDuration, transitionDuration, mode }) => {
			const t = Math.min(transitionDuration, elementDuration / 2);
			const channels: Record<string, { time: number; value: number }[]> = {};
			const opacityKeys: { time: number; value: number }[] = [];

			if (mode === "in" || mode === "both") {
				opacityKeys.push({ time: 0, value: 0 });
				opacityKeys.push({ time: t * 0.7, value: 0.1 });
				opacityKeys.push({ time: t, value: 1 });
			}
			if (mode === "out" || mode === "both") {
				opacityKeys.push({ time: elementDuration - t, value: 1 });
				opacityKeys.push({ time: elementDuration - t * 0.3, value: 0.1 });
				opacityKeys.push({ time: elementDuration, value: 0 });
			}
			channels["opacity"] = opacityKeys;
			return channels;
		},
	},
	{
		id: "flash-white",
		name: "Flash White",
		category: "Fade",
		description: "Kilatan cahaya putih sinematik",
		cssClass: "animate-flash-white",
		apply: ({ elementDuration, transitionDuration, mode }) => {
			const t = Math.min(transitionDuration, elementDuration / 2);
			const channels: Record<string, { time: number; value: number }[]> = {};
			const opacityKeys: { time: number; value: number }[] = [];
			const scaleKeys: { time: number; value: number }[] = [];

			if (mode === "in" || mode === "both") {
				opacityKeys.push({ time: 0, value: 0.2 });
				opacityKeys.push({ time: t * 0.3, value: 0.95 });
				opacityKeys.push({ time: t, value: 1 });

				scaleKeys.push({ time: 0, value: 1.25 });
				scaleKeys.push({ time: t, value: 1.0 });
			}
			if (mode === "out" || mode === "both") {
				opacityKeys.push({ time: elementDuration - t, value: 1 });
				opacityKeys.push({ time: elementDuration - t * 0.3, value: 0.95 });
				opacityKeys.push({ time: elementDuration, value: 0.2 });

				scaleKeys.push({ time: elementDuration - t, value: 1.0 });
				scaleKeys.push({ time: elementDuration, value: 1.25 });
			}
			channels["opacity"] = opacityKeys;
			channels["transform.scaleX"] = scaleKeys;
			channels["transform.scaleY"] = scaleKeys;
			return channels;
		},
	},
	{
		id: "blink-strobe",
		name: "Blink Strobe",
		category: "Fade",
		description: "Kedipan cepat ritmis estetis",
		cssClass: "animate-blink",
		apply: ({ elementDuration, transitionDuration, mode }) => {
			const t = Math.min(transitionDuration, elementDuration / 2);
			const channels: Record<string, { time: number; value: number }[]> = {};
			const opacityKeys: { time: number; value: number }[] = [];

			if (mode === "in" || mode === "both") {
				opacityKeys.push({ time: 0, value: 0 });
				opacityKeys.push({ time: t * 0.3, value: 1 });
				opacityKeys.push({ time: t * 0.55, value: 0.15 });
				opacityKeys.push({ time: t * 0.8, value: 1 });
				opacityKeys.push({ time: t, value: 1 });
			}
			if (mode === "out" || mode === "both") {
				opacityKeys.push({ time: elementDuration - t, value: 1 });
				opacityKeys.push({ time: elementDuration - t * 0.8, value: 0.15 });
				opacityKeys.push({ time: elementDuration - t * 0.55, value: 1 });
				opacityKeys.push({ time: elementDuration - t * 0.3, value: 0 });
				opacityKeys.push({ time: elementDuration, value: 0 });
			}
			channels["opacity"] = opacityKeys;
			return channels;
		},
	},
	{
		id: "ghost-fade",
		name: "Ghost Fade",
		category: "Dissolve",
		description: "Pudar halus bertahap tembus pandang",
		cssClass: "animate-ghost",
		apply: ({ elementDuration, transitionDuration, mode }) => {
			const t = Math.min(transitionDuration, elementDuration / 2);
			const channels: Record<string, { time: number; value: number }[]> = {};
			const opacityKeys: { time: number; value: number }[] = [];

			if (mode === "in" || mode === "both") {
				opacityKeys.push({ time: 0, value: 0.1 });
				opacityKeys.push({ time: t * 0.5, value: 0.6 });
				opacityKeys.push({ time: t, value: 1 });
			}
			if (mode === "out" || mode === "both") {
				opacityKeys.push({ time: elementDuration - t, value: 1 });
				opacityKeys.push({ time: elementDuration - t * 0.5, value: 0.6 });
				opacityKeys.push({ time: elementDuration, value: 0.1 });
			}
			channels["opacity"] = opacityKeys;
			return channels;
		},
	},

	// ==================== MOTION & SLIDES ====================
	{
		id: "slide-left",
		name: "Slide Left",
		category: "Motion",
		description: "Klip bergeser masuk dari kanan ke kiri",
		cssClass: "animate-slide-left",
		apply: ({ elementDuration, transitionDuration, mode }) => {
			const t = Math.min(transitionDuration, elementDuration / 2);
			const channels: Record<string, { time: number; value: number }[]> = {};
			const posKeys: { time: number; value: number }[] = [];

			if (mode === "in" || mode === "both") {
				posKeys.push({ time: 0, value: 350 });
				posKeys.push({ time: t, value: 0 });
			}
			if (mode === "out" || mode === "both") {
				posKeys.push({ time: elementDuration - t, value: 0 });
				posKeys.push({ time: elementDuration, value: -350 });
			}
			channels["transform.positionX"] = posKeys;
			return channels;
		},
	},
	{
		id: "slide-right",
		name: "Slide Right",
		category: "Motion",
		description: "Klip bergeser masuk dari kiri ke kanan",
		cssClass: "animate-slide-right",
		apply: ({ elementDuration, transitionDuration, mode }) => {
			const t = Math.min(transitionDuration, elementDuration / 2);
			const channels: Record<string, { time: number; value: number }[]> = {};
			const posKeys: { time: number; value: number }[] = [];

			if (mode === "in" || mode === "both") {
				posKeys.push({ time: 0, value: -350 });
				posKeys.push({ time: t, value: 0 });
			}
			if (mode === "out" || mode === "both") {
				posKeys.push({ time: elementDuration - t, value: 0 });
				posKeys.push({ time: elementDuration, value: 350 });
			}
			channels["transform.positionX"] = posKeys;
			return channels;
		},
	},
	{
		id: "slide-up",
		name: "Slide Up",
		category: "Motion",
		description: "Klip bergeser naik dari bawah",
		cssClass: "animate-slide-up",
		apply: ({ elementDuration, transitionDuration, mode }) => {
			const t = Math.min(transitionDuration, elementDuration / 2);
			const channels: Record<string, { time: number; value: number }[]> = {};
			const posKeys: { time: number; value: number }[] = [];

			if (mode === "in" || mode === "both") {
				posKeys.push({ time: 0, value: 250 });
				posKeys.push({ time: t, value: 0 });
			}
			if (mode === "out" || mode === "both") {
				posKeys.push({ time: elementDuration - t, value: 0 });
				posKeys.push({ time: elementDuration, value: -250 });
			}
			channels["transform.positionY"] = posKeys;
			return channels;
		},
	},
	{
		id: "slide-down",
		name: "Slide Down",
		category: "Motion",
		description: "Klip bergeser turun dari atas",
		cssClass: "animate-slide-down",
		apply: ({ elementDuration, transitionDuration, mode }) => {
			const t = Math.min(transitionDuration, elementDuration / 2);
			const channels: Record<string, { time: number; value: number }[]> = {};
			const posKeys: { time: number; value: number }[] = [];

			if (mode === "in" || mode === "both") {
				posKeys.push({ time: 0, value: -250 });
				posKeys.push({ time: t, value: 0 });
			}
			if (mode === "out" || mode === "both") {
				posKeys.push({ time: elementDuration - t, value: 0 });
				posKeys.push({ time: elementDuration, value: 250 });
			}
			channels["transform.positionY"] = posKeys;
			return channels;
		},
	},
	{
		id: "push-left",
		name: "Push Left",
		category: "Motion",
		description: "Dorong klip ke kiri dengan skala dinamis",
		cssClass: "animate-push-left",
		apply: ({ elementDuration, transitionDuration, mode }) => {
			const t = Math.min(transitionDuration, elementDuration / 2);
			const channels: Record<string, { time: number; value: number }[]> = {};
			const posKeys: { time: number; value: number }[] = [];
			const scaleKeys: { time: number; value: number }[] = [];

			if (mode === "in" || mode === "both") {
				posKeys.push({ time: 0, value: 400 });
				posKeys.push({ time: t, value: 0 });

				scaleKeys.push({ time: 0, value: 0.9 });
				scaleKeys.push({ time: t, value: 1.0 });
			}
			if (mode === "out" || mode === "both") {
				posKeys.push({ time: elementDuration - t, value: 0 });
				posKeys.push({ time: elementDuration, value: -400 });

				scaleKeys.push({ time: elementDuration - t, value: 1.0 });
				scaleKeys.push({ time: elementDuration, value: 0.9 });
			}
			channels["transform.positionX"] = posKeys;
			channels["transform.scaleX"] = scaleKeys;
			channels["transform.scaleY"] = scaleKeys;
			return channels;
		},
	},
	{
		id: "push-right",
		name: "Push Right",
		category: "Motion",
		description: "Dorong klip ke kanan dengan skala dinamis",
		cssClass: "animate-push-right",
		apply: ({ elementDuration, transitionDuration, mode }) => {
			const t = Math.min(transitionDuration, elementDuration / 2);
			const channels: Record<string, { time: number; value: number }[]> = {};
			const posKeys: { time: number; value: number }[] = [];
			const scaleKeys: { time: number; value: number }[] = [];

			if (mode === "in" || mode === "both") {
				posKeys.push({ time: 0, value: -400 });
				posKeys.push({ time: t, value: 0 });

				scaleKeys.push({ time: 0, value: 0.9 });
				scaleKeys.push({ time: t, value: 1.0 });
			}
			if (mode === "out" || mode === "both") {
				posKeys.push({ time: elementDuration - t, value: 0 });
				posKeys.push({ time: elementDuration, value: 400 });

				scaleKeys.push({ time: elementDuration - t, value: 1.0 });
				scaleKeys.push({ time: elementDuration, value: 0.9 });
			}
			channels["transform.positionX"] = posKeys;
			channels["transform.scaleX"] = scaleKeys;
			channels["transform.scaleY"] = scaleKeys;
			return channels;
		},
	},
	{
		id: "diagonal-in",
		name: "Diagonal Swipe",
		category: "Motion",
		description: "Klip meluncur dari sudut serong dinamis",
		cssClass: "animate-diagonal",
		apply: ({ elementDuration, transitionDuration, mode }) => {
			const t = Math.min(transitionDuration, elementDuration / 2);
			const channels: Record<string, { time: number; value: number }[]> = {};
			const posXKeys: { time: number; value: number }[] = [];
			const posYKeys: { time: number; value: number }[] = [];

			if (mode === "in" || mode === "both") {
				posXKeys.push({ time: 0, value: 300 });
				posXKeys.push({ time: t, value: 0 });

				posYKeys.push({ time: 0, value: 200 });
				posYKeys.push({ time: t, value: 0 });
			}
			if (mode === "out" || mode === "both") {
				posXKeys.push({ time: elementDuration - t, value: 0 });
				posXKeys.push({ time: elementDuration, value: -300 });

				posYKeys.push({ time: elementDuration - t, value: 0 });
				posYKeys.push({ time: elementDuration, value: -200 });
			}
			channels["transform.positionX"] = posXKeys;
			channels["transform.positionY"] = posYKeys;
			return channels;
		},
	},

	// ==================== ZOOM & SCALE ====================
	{
		id: "zoom-in",
		name: "Zoom In",
		category: "Zoom",
		description: "Klip membesar dari dekat ke normal",
		cssClass: "animate-zoom-in",
		apply: ({ elementDuration, transitionDuration, mode }) => {
			const t = Math.min(transitionDuration, elementDuration / 2);
			const channels: Record<string, { time: number; value: number }[]> = {};
			const scaleKeys: { time: number; value: number }[] = [];

			if (mode === "in" || mode === "both") {
				scaleKeys.push({ time: 0, value: 1.4 });
				scaleKeys.push({ time: t, value: 1.0 });
			}
			if (mode === "out" || mode === "both") {
				scaleKeys.push({ time: elementDuration - t, value: 1.0 });
				scaleKeys.push({ time: elementDuration, value: 1.4 });
			}
			channels["transform.scaleX"] = scaleKeys;
			channels["transform.scaleY"] = scaleKeys;
			return channels;
		},
	},
	{
		id: "zoom-out",
		name: "Zoom Out",
		category: "Zoom",
		description: "Klip mengecil dari jauh ke normal",
		cssClass: "animate-zoom-out",
		apply: ({ elementDuration, transitionDuration, mode }) => {
			const t = Math.min(transitionDuration, elementDuration / 2);
			const channels: Record<string, { time: number; value: number }[]> = {};
			const scaleKeys: { time: number; value: number }[] = [];

			if (mode === "in" || mode === "both") {
				scaleKeys.push({ time: 0, value: 0.65 });
				scaleKeys.push({ time: t, value: 1.0 });
			}
			if (mode === "out" || mode === "both") {
				scaleKeys.push({ time: elementDuration - t, value: 1.0 });
				scaleKeys.push({ time: elementDuration, value: 0.65 });
			}
			channels["transform.scaleX"] = scaleKeys;
			channels["transform.scaleY"] = scaleKeys;
			return channels;
		},
	},
	{
		id: "crash-zoom",
		name: "Crash Zoom",
		category: "Zoom",
		description: "Hentakan zoom dramatis ala film aksi",
		cssClass: "animate-crash-zoom",
		apply: ({ elementDuration, transitionDuration, mode }) => {
			const t = Math.min(transitionDuration, elementDuration / 2);
			const channels: Record<string, { time: number; value: number }[]> = {};
			const scaleKeys: { time: number; value: number }[] = [];
			const opacityKeys: { time: number; value: number }[] = [];

			if (mode === "in" || mode === "both") {
				scaleKeys.push({ time: 0, value: 2.5 });
				scaleKeys.push({ time: t, value: 1.0 });

				opacityKeys.push({ time: 0, value: 0.3 });
				opacityKeys.push({ time: t, value: 1.0 });
			}
			if (mode === "out" || mode === "both") {
				scaleKeys.push({ time: elementDuration - t, value: 1.0 });
				scaleKeys.push({ time: elementDuration, value: 2.5 });

				opacityKeys.push({ time: elementDuration - t, value: 1.0 });
				opacityKeys.push({ time: elementDuration, value: 0.3 });
			}
			channels["transform.scaleX"] = scaleKeys;
			channels["transform.scaleY"] = scaleKeys;
			channels["opacity"] = opacityKeys;
			return channels;
		},
	},
	{
		id: "bounce-zoom",
		name: "Bounce Zoom",
		category: "Zoom",
		description: "Zoom elastis membal lentur",
		cssClass: "animate-bounce-zoom",
		apply: ({ elementDuration, transitionDuration, mode }) => {
			const t = Math.min(transitionDuration, elementDuration / 2);
			const channels: Record<string, { time: number; value: number }[]> = {};
			const scaleKeys: { time: number; value: number }[] = [];

			if (mode === "in" || mode === "both") {
				scaleKeys.push({ time: 0, value: 0.5 });
				scaleKeys.push({ time: t * 0.65, value: 1.15 });
				scaleKeys.push({ time: t * 0.85, value: 0.95 });
				scaleKeys.push({ time: t, value: 1.0 });
			}
			if (mode === "out" || mode === "both") {
				scaleKeys.push({ time: elementDuration - t, value: 1.0 });
				scaleKeys.push({ time: elementDuration - t * 0.35, value: 1.15 });
				scaleKeys.push({ time: elementDuration, value: 0.5 });
			}
			channels["transform.scaleX"] = scaleKeys;
			channels["transform.scaleY"] = scaleKeys;
			return channels;
		},
	},
	{
		id: "whip-zoom",
		name: "Whip Zoom",
		category: "Zoom",
		description: "Hentakan transisi kilat dinamis",
		cssClass: "animate-whip-zoom",
		apply: ({ elementDuration, transitionDuration, mode }) => {
			const t = Math.min(transitionDuration, elementDuration / 2);
			const channels: Record<string, { time: number; value: number }[]> = {};
			const scaleKeys: { time: number; value: number }[] = [];

			if (mode === "in" || mode === "both") {
				scaleKeys.push({ time: 0, value: 1.8 });
				scaleKeys.push({ time: t * 0.7, value: 0.92 });
				scaleKeys.push({ time: t, value: 1.0 });
			}
			if (mode === "out" || mode === "both") {
				scaleKeys.push({ time: elementDuration - t, value: 1.0 });
				scaleKeys.push({ time: elementDuration - t * 0.3, value: 0.92 });
				scaleKeys.push({ time: elementDuration, value: 1.8 });
			}
			channels["transform.scaleX"] = scaleKeys;
			channels["transform.scaleY"] = scaleKeys;
			return channels;
		},
	},
	{
		id: "mini-zoom",
		name: "Subtle Pulse",
		category: "Zoom",
		description: "Zoom halus untuk vlog dan montase",
		cssClass: "animate-mini-zoom",
		apply: ({ elementDuration, transitionDuration, mode }) => {
			const t = Math.min(transitionDuration, elementDuration / 2);
			const channels: Record<string, { time: number; value: number }[]> = {};
			const scaleKeys: { time: number; value: number }[] = [];

			if (mode === "in" || mode === "both") {
				scaleKeys.push({ time: 0, value: 1.12 });
				scaleKeys.push({ time: t, value: 1.0 });
			}
			if (mode === "out" || mode === "both") {
				scaleKeys.push({ time: elementDuration - t, value: 1.0 });
				scaleKeys.push({ time: elementDuration, value: 1.12 });
			}
			channels["transform.scaleX"] = scaleKeys;
			channels["transform.scaleY"] = scaleKeys;
			return channels;
		},
	},

	// ==================== SPIN & 3D ====================
	{
		id: "rotate-snap",
		name: "Spin In CW",
		category: "Spin",
		description: "Klip berputar searah jarum jam saat masuk",
		cssClass: "animate-spin-in",
		apply: ({ elementDuration, transitionDuration, mode }) => {
			const t = Math.min(transitionDuration, elementDuration / 2);
			const channels: Record<string, { time: number; value: number }[]> = {};
			const rotKeys: { time: number; value: number }[] = [];
			const scaleKeys: { time: number; value: number }[] = [];

			if (mode === "in" || mode === "both") {
				rotKeys.push({ time: 0, value: -45 });
				rotKeys.push({ time: t, value: 0 });

				scaleKeys.push({ time: 0, value: 0.8 });
				scaleKeys.push({ time: t, value: 1.0 });
			}
			if (mode === "out" || mode === "both") {
				rotKeys.push({ time: elementDuration - t, value: 0 });
				rotKeys.push({ time: elementDuration, value: 45 });

				scaleKeys.push({ time: elementDuration - t, value: 1.0 });
				scaleKeys.push({ time: elementDuration, value: 0.8 });
			}
			channels["transform.rotate"] = rotKeys;
			channels["transform.scaleX"] = scaleKeys;
			channels["transform.scaleY"] = scaleKeys;
			return channels;
		},
	},
	{
		id: "spin-ccw",
		name: "Spin In CCW",
		category: "Spin",
		description: "Klip berputar berlawanan jarum jam",
		cssClass: "animate-spin-ccw",
		apply: ({ elementDuration, transitionDuration, mode }) => {
			const t = Math.min(transitionDuration, elementDuration / 2);
			const channels: Record<string, { time: number; value: number }[]> = {};
			const rotKeys: { time: number; value: number }[] = [];
			const scaleKeys: { time: number; value: number }[] = [];

			if (mode === "in" || mode === "both") {
				rotKeys.push({ time: 0, value: 45 });
				rotKeys.push({ time: t, value: 0 });

				scaleKeys.push({ time: 0, value: 0.8 });
				scaleKeys.push({ time: t, value: 1.0 });
			}
			if (mode === "out" || mode === "both") {
				rotKeys.push({ time: elementDuration - t, value: 0 });
				rotKeys.push({ time: elementDuration, value: -45 });

				scaleKeys.push({ time: elementDuration - t, value: 1.0 });
				scaleKeys.push({ time: elementDuration, value: 0.8 });
			}
			channels["transform.rotate"] = rotKeys;
			channels["transform.scaleX"] = scaleKeys;
			channels["transform.scaleY"] = scaleKeys;
			return channels;
		},
	},
	{
		id: "spin-360",
		name: "Spin 360 Full",
		category: "Spin",
		description: "Putaran penuh 360 derajat dramatis",
		cssClass: "animate-spin-360",
		apply: ({ elementDuration, transitionDuration, mode }) => {
			const t = Math.min(transitionDuration, elementDuration / 2);
			const channels: Record<string, { time: number; value: number }[]> = {};
			const rotKeys: { time: number; value: number }[] = [];
			const scaleKeys: { time: number; value: number }[] = [];
			const opacityKeys: { time: number; value: number }[] = [];

			if (mode === "in" || mode === "both") {
				rotKeys.push({ time: 0, value: 360 });
				rotKeys.push({ time: t, value: 0 });

				scaleKeys.push({ time: 0, value: 0.3 });
				scaleKeys.push({ time: t, value: 1.0 });

				opacityKeys.push({ time: 0, value: 0.2 });
				opacityKeys.push({ time: t, value: 1.0 });
			}
			if (mode === "out" || mode === "both") {
				rotKeys.push({ time: elementDuration - t, value: 0 });
				rotKeys.push({ time: elementDuration, value: -360 });

				scaleKeys.push({ time: elementDuration - t, value: 1.0 });
				scaleKeys.push({ time: elementDuration, value: 0.3 });

				opacityKeys.push({ time: elementDuration - t, value: 1.0 });
				opacityKeys.push({ time: elementDuration, value: 0.2 });
			}
			channels["transform.rotate"] = rotKeys;
			channels["transform.scaleX"] = scaleKeys;
			channels["transform.scaleY"] = scaleKeys;
			channels["opacity"] = opacityKeys;
			return channels;
		},
	},
	{
		id: "vortex-warp",
		name: "Vortex Warp",
		category: "Spin",
		description: "Putaran pusaran dengan percepatan skala",
		cssClass: "animate-vortex",
		apply: ({ elementDuration, transitionDuration, mode }) => {
			const t = Math.min(transitionDuration, elementDuration / 2);
			const channels: Record<string, { time: number; value: number }[]> = {};
			const rotKeys: { time: number; value: number }[] = [];
			const scaleKeys: { time: number; value: number }[] = [];

			if (mode === "in" || mode === "both") {
				rotKeys.push({ time: 0, value: -180 });
				rotKeys.push({ time: t, value: 0 });

				scaleKeys.push({ time: 0, value: 0.2 });
				scaleKeys.push({ time: t, value: 1.0 });
			}
			if (mode === "out" || mode === "both") {
				rotKeys.push({ time: elementDuration - t, value: 0 });
				rotKeys.push({ time: elementDuration, value: 180 });

				scaleKeys.push({ time: elementDuration - t, value: 1.0 });
				scaleKeys.push({ time: elementDuration, value: 0.2 });
			}
			channels["transform.rotate"] = rotKeys;
			channels["transform.scaleX"] = scaleKeys;
			channels["transform.scaleY"] = scaleKeys;
			return channels;
		},
	},
	{
		id: "tilt-snap",
		name: "Tilt Snap",
		category: "Spin",
		description: "Miring sesaat lalu sejajar presisi",
		cssClass: "animate-tilt",
		apply: ({ elementDuration, transitionDuration, mode }) => {
			const t = Math.min(transitionDuration, elementDuration / 2);
			const channels: Record<string, { time: number; value: number }[]> = {};
			const rotKeys: { time: number; value: number }[] = [];
			const posKeys: { time: number; value: number }[] = [];

			if (mode === "in" || mode === "both") {
				rotKeys.push({ time: 0, value: -15 });
				rotKeys.push({ time: t * 0.7, value: 4 });
				rotKeys.push({ time: t, value: 0 });

				posKeys.push({ time: 0, value: 120 });
				posKeys.push({ time: t, value: 0 });
			}
			if (mode === "out" || mode === "both") {
				rotKeys.push({ time: elementDuration - t, value: 0 });
				rotKeys.push({ time: elementDuration - t * 0.3, value: 4 });
				rotKeys.push({ time: elementDuration, value: -15 });

				posKeys.push({ time: elementDuration - t, value: 0 });
				posKeys.push({ time: elementDuration, value: -120 });
			}
			channels["transform.rotate"] = rotKeys;
			channels["transform.positionX"] = posKeys;
			return channels;
		},
	},

	// ==================== SHAKE & GLITCH ====================
	{
		id: "camera-shake",
		name: "Camera Shake",
		category: "Shake",
		description: "Goyangan kamera dinamis berenergi",
		cssClass: "animate-shake",
		apply: ({ elementDuration, transitionDuration, mode }) => {
			const t = Math.min(transitionDuration, elementDuration / 2);
			const channels: Record<string, { time: number; value: number }[]> = {};
			const posXKeys: { time: number; value: number }[] = [];
			const posYKeys: { time: number; value: number }[] = [];

			if (mode === "in" || mode === "both") {
				posXKeys.push({ time: 0, value: 0 });
				posXKeys.push({ time: t * 0.2, value: 20 });
				posXKeys.push({ time: t * 0.4, value: -18 });
				posXKeys.push({ time: t * 0.6, value: 12 });
				posXKeys.push({ time: t * 0.8, value: -6 });
				posXKeys.push({ time: t, value: 0 });

				posYKeys.push({ time: 0, value: 0 });
				posYKeys.push({ time: t * 0.2, value: -15 });
				posYKeys.push({ time: t * 0.4, value: 14 });
				posYKeys.push({ time: t * 0.6, value: -8 });
				posYKeys.push({ time: t * 0.8, value: 5 });
				posYKeys.push({ time: t, value: 0 });
			}
			if (mode === "out" || mode === "both") {
				posXKeys.push({ time: elementDuration - t, value: 0 });
				posXKeys.push({ time: elementDuration - t * 0.8, value: -6 });
				posXKeys.push({ time: elementDuration - t * 0.6, value: 12 });
				posXKeys.push({ time: elementDuration - t * 0.4, value: -18 });
				posXKeys.push({ time: elementDuration - t * 0.2, value: 20 });
				posXKeys.push({ time: elementDuration, value: 0 });

				posYKeys.push({ time: elementDuration - t, value: 0 });
				posYKeys.push({ time: elementDuration - t * 0.8, value: 5 });
				posYKeys.push({ time: elementDuration - t * 0.6, value: -8 });
				posYKeys.push({ time: elementDuration - t * 0.4, value: 14 });
				posYKeys.push({ time: elementDuration - t * 0.2, value: -15 });
				posYKeys.push({ time: elementDuration, value: 0 });
			}
			channels["transform.positionX"] = posXKeys;
			channels["transform.positionY"] = posYKeys;
			return channels;
		},
	},
	{
		id: "glitch-twitch",
		name: "Glitch Twitch",
		category: "Glitch",
		description: "Hentakan distorsi posisi acak futuristik",
		cssClass: "animate-glitch",
		apply: ({ elementDuration, transitionDuration, mode }) => {
			const t = Math.min(transitionDuration, elementDuration / 2);
			const channels: Record<string, { time: number; value: number }[]> = {};
			const posXKeys: { time: number; value: number }[] = [];
			const opacityKeys: { time: number; value: number }[] = [];

			if (mode === "in" || mode === "both") {
				posXKeys.push({ time: 0, value: -35 });
				posXKeys.push({ time: t * 0.25, value: 30 });
				posXKeys.push({ time: t * 0.5, value: -15 });
				posXKeys.push({ time: t * 0.75, value: 10 });
				posXKeys.push({ time: t, value: 0 });

				opacityKeys.push({ time: 0, value: 0.4 });
				opacityKeys.push({ time: t * 0.25, value: 1.0 });
				opacityKeys.push({ time: t * 0.5, value: 0.6 });
				opacityKeys.push({ time: t * 0.75, value: 1.0 });
				opacityKeys.push({ time: t, value: 1.0 });
			}
			if (mode === "out" || mode === "both") {
				posXKeys.push({ time: elementDuration - t, value: 0 });
				posXKeys.push({ time: elementDuration - t * 0.75, value: 10 });
				posXKeys.push({ time: elementDuration - t * 0.5, value: -15 });
				posXKeys.push({ time: elementDuration - t * 0.25, value: 30 });
				posXKeys.push({ time: elementDuration, value: -35 });

				opacityKeys.push({ time: elementDuration - t, value: 1.0 });
				opacityKeys.push({ time: elementDuration - t * 0.75, value: 0.6 });
				opacityKeys.push({ time: elementDuration - t * 0.5, value: 1.0 });
				opacityKeys.push({ time: elementDuration - t * 0.25, value: 0.4 });
				opacityKeys.push({ time: elementDuration, value: 0 });
			}
			channels["transform.positionX"] = posXKeys;
			channels["opacity"] = opacityKeys;
			return channels;
		},
	},
	{
		id: "horizontal-jitter",
		name: "Horizontal Jitter",
		category: "Glitch",
		description: "Getaran cepat horizontal ke titik tenang",
		cssClass: "animate-jitter",
		apply: ({ elementDuration, transitionDuration, mode }) => {
			const t = Math.min(transitionDuration, elementDuration / 2);
			const channels: Record<string, { time: number; value: number }[]> = {};
			const posXKeys: { time: number; value: number }[] = [];

			if (mode === "in" || mode === "both") {
				posXKeys.push({ time: 0, value: 0 });
				posXKeys.push({ time: t * 0.2, value: 28 });
				posXKeys.push({ time: t * 0.4, value: -28 });
				posXKeys.push({ time: t * 0.6, value: 16 });
				posXKeys.push({ time: t * 0.8, value: -8 });
				posXKeys.push({ time: t, value: 0 });
			}
			if (mode === "out" || mode === "both") {
				posXKeys.push({ time: elementDuration - t, value: 0 });
				posXKeys.push({ time: elementDuration - t * 0.8, value: -8 });
				posXKeys.push({ time: elementDuration - t * 0.6, value: 16 });
				posXKeys.push({ time: elementDuration - t * 0.4, value: -28 });
				posXKeys.push({ time: elementDuration - t * 0.2, value: 28 });
				posXKeys.push({ time: elementDuration, value: 0 });
			}
			channels["transform.positionX"] = posXKeys;
			return channels;
		},
	},
	{
		id: "vertical-bounce",
		name: "Vertical Bounce",
		category: "Shake",
		description: "Pantulan vertikal elastis berdenyut",
		cssClass: "animate-vert-bounce",
		apply: ({ elementDuration, transitionDuration, mode }) => {
			const t = Math.min(transitionDuration, elementDuration / 2);
			const channels: Record<string, { time: number; value: number }[]> = {};
			const posYKeys: { time: number; value: number }[] = [];

			if (mode === "in" || mode === "both") {
				posYKeys.push({ time: 0, value: -160 });
				posYKeys.push({ time: t * 0.6, value: 22 });
				posYKeys.push({ time: t * 0.8, value: -10 });
				posYKeys.push({ time: t, value: 0 });
			}
			if (mode === "out" || mode === "both") {
				posYKeys.push({ time: elementDuration - t, value: 0 });
				posYKeys.push({ time: elementDuration - t * 0.4, value: 22 });
				posYKeys.push({ time: elementDuration, value: 160 });
			}
			channels["transform.positionY"] = posYKeys;
			return channels;
		},
	},
	{
		id: "impact-hit",
		name: "Impact Hit",
		category: "Shake",
		description: "Dentuman hentak ritmis pas untuk beat musik",
		cssClass: "animate-impact",
		apply: ({ elementDuration, transitionDuration, mode }) => {
			const t = Math.min(transitionDuration, elementDuration / 2);
			const channels: Record<string, { time: number; value: number }[]> = {};
			const scaleKeys: { time: number; value: number }[] = [];
			const posYKeys: { time: number; value: number }[] = [];

			if (mode === "in" || mode === "both") {
				scaleKeys.push({ time: 0, value: 1.5 });
				scaleKeys.push({ time: t * 0.5, value: 0.94 });
				scaleKeys.push({ time: t * 0.8, value: 1.03 });
				scaleKeys.push({ time: t, value: 1.0 });

				posYKeys.push({ time: 0, value: -20 });
				posYKeys.push({ time: t * 0.5, value: 5 });
				posYKeys.push({ time: t, value: 0 });
			}
			if (mode === "out" || mode === "both") {
				scaleKeys.push({ time: elementDuration - t, value: 1.0 });
				scaleKeys.push({ time: elementDuration - t * 0.5, value: 0.94 });
				scaleKeys.push({ time: elementDuration, value: 1.5 });

				posYKeys.push({ time: elementDuration - t, value: 0 });
				posYKeys.push({ time: elementDuration, value: 20 });
			}
			channels["transform.scaleX"] = scaleKeys;
			channels["transform.scaleY"] = scaleKeys;
			channels["transform.positionY"] = posYKeys;
			return channels;
		},
	},
];
