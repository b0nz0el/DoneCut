import type { TransitionPreset } from "./types";

export const TRANSITION_PRESETS: TransitionPreset[] = [
	{
		id: "fade",
		name: "Cross Dissolve",
		category: "Basic",
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
		description: "Pudar ke warna hitam",
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
				scaleKeys.push({ time: 0, value: 1.35 });
				scaleKeys.push({ time: t, value: 1.0 });
			}
			if (mode === "out" || mode === "both") {
				scaleKeys.push({ time: elementDuration - t, value: 1.0 });
				scaleKeys.push({ time: elementDuration, value: 1.35 });
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
				scaleKeys.push({ time: 0, value: 0.7 });
				scaleKeys.push({ time: t, value: 1.0 });
			}
			if (mode === "out" || mode === "both") {
				scaleKeys.push({ time: elementDuration - t, value: 1.0 });
				scaleKeys.push({ time: elementDuration, value: 0.7 });
			}
			channels["transform.scaleX"] = scaleKeys;
			channels["transform.scaleY"] = scaleKeys;
			return channels;
		},
	},
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
				posKeys.push({ time: 0, value: 300 });
				posKeys.push({ time: t, value: 0 });
			}
			if (mode === "out" || mode === "both") {
				posKeys.push({ time: elementDuration - t, value: 0 });
				posKeys.push({ time: elementDuration, value: -300 });
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
				posKeys.push({ time: 0, value: -300 });
				posKeys.push({ time: t, value: 0 });
			}
			if (mode === "out" || mode === "both") {
				posKeys.push({ time: elementDuration - t, value: 0 });
				posKeys.push({ time: elementDuration, value: 300 });
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
				posKeys.push({ time: 0, value: 200 });
				posKeys.push({ time: t, value: 0 });
			}
			if (mode === "out" || mode === "both") {
				posKeys.push({ time: elementDuration - t, value: 0 });
				posKeys.push({ time: elementDuration, value: -200 });
			}
			channels["transform.positionY"] = posKeys;
			return channels;
		},
	},
	{
		id: "rotate-snap",
		name: "Spin In",
		category: "Motion",
		description: "Klip berputar saat masuk",
		cssClass: "animate-spin-in",
		apply: ({ elementDuration, transitionDuration, mode }) => {
			const t = Math.min(transitionDuration, elementDuration / 2);
			const channels: Record<string, { time: number; value: number }[]> = {};
			const rotKeys: { time: number; value: number }[] = [];

			if (mode === "in" || mode === "both") {
				rotKeys.push({ time: 0, value: -35 });
				rotKeys.push({ time: t, value: 0 });
			}
			if (mode === "out" || mode === "both") {
				rotKeys.push({ time: elementDuration - t, value: 0 });
				rotKeys.push({ time: elementDuration, value: 35 });
			}
			channels["transform.rotate"] = rotKeys;
			return channels;
		},
	},
];
