"use client";

import { useState } from "react";
import { PanelView } from "@/components/editor/panels/assets/views/base-panel";
import { Button } from "@/components/ui/button";
import { useEditor } from "@/editor/use-editor";
import { toast } from "sonner";
import { TRANSITION_PRESETS } from "../presets";
import type { TransitionMode, TransitionPreset } from "../types";
import { mediaTimeToSeconds, mediaTimeFromSeconds } from "@/wasm";
import { setChannel } from "@/animation";
import type { ScalarAnimationChannel } from "@/animation/types";
import { generateUUID } from "@/utils/id";
import { cn } from "@/utils/ui";
import {
	ArrowRightDoubleIcon,
	MagicWand05Icon,
	FlashIcon,
	ViewIcon,
} from "@hugeicons/core-free-icons";
import { HugeiconsIcon } from "@hugeicons/react";

const DURATIONS = [0.3, 0.5, 1.0, 1.5];
const CATEGORIES = ["All", "Basic", "Motion", "Zoom", "Fade"] as const;

export function TransitionsView() {
	const editor = useEditor();
	const [activeCategory, setActiveCategory] = useState<string>("All");
	const [selectedDuration, setSelectedDuration] = useState<number>(0.5);
	const [transitionMode, setTransitionMode] = useState<TransitionMode>("in");

	const filteredPresets =
		activeCategory === "All"
			? TRANSITION_PRESETS
			: TRANSITION_PRESETS.filter((p) => p.category === activeCategory);

	const handleApplyTransition = (preset: TransitionPreset) => {
		const selected = editor.selection.getSelectedElements();
		if (selected.length === 0) {
			toast.error("Pilih klip video/gambar di timeline terlebih dahulu");
			return;
		}

		const elementsWithTracks = editor.timeline.getElementsWithTracks({
			elements: [...selected],
		});
		if (elementsWithTracks.length === 0) {
			toast.error("Klip yang dipilih tidak ditemukan");
			return;
		}

		let appliedCount = 0;

		for (const { element, track } of elementsWithTracks) {
			const durationSec = mediaTimeToSeconds({ time: element.duration });
			if (durationSec <= 0.1) continue;

			const keyframeChannels = preset.apply({
				elementDuration: durationSec,
				transitionDuration: selectedDuration,
				mode: transitionMode,
			});

			let nextAnimations = { ...(element.animations ?? {}) };

			for (const [propPath, keys] of Object.entries(keyframeChannels)) {
				const channel: ScalarAnimationChannel = {
					keys: keys.map((k) => ({
						id: generateUUID(),
						time: mediaTimeFromSeconds({ seconds: k.time }),
						value: k.value,
						interpolation: "linear" as const,
					})),
					extrapolation: "hold" as const,
				};
				nextAnimations = setChannel({
					animations: nextAnimations,
					propertyPath: propPath,
					channel,
				});
			}

			editor.timeline.updateElements({
				updates: [
					{
						trackId: track.id,
						elementId: element.id,
						patch: { animations: nextAnimations },
					},
				],
			});
			appliedCount++;
		}

		if (appliedCount > 0) {
			toast.success(
				`Transisi "${preset.name}" (${selectedDuration}s) berhasil diterapkan!`,
			);
		}
	};

	return (
		<PanelView title="Transitions">
			<div className="flex flex-col gap-4 p-1">
				{/* Category Pills */}
				<div className="flex flex-wrap gap-1">
					{CATEGORIES.map((cat) => (
						<button
							key={cat}
							type="button"
							onClick={() => setActiveCategory(cat)}
							className={cn(
								"px-2.5 py-1 text-xs rounded-full font-medium transition-colors",
								activeCategory === cat
									? "bg-primary text-primary-foreground"
									: "bg-muted text-muted-foreground hover:bg-muted/80",
							)}
						>
							{cat}
						</button>
					))}
				</div>

				{/* Controls: Mode & Duration */}
				<div className="flex flex-col gap-2 p-2.5 rounded-lg border bg-card/50 text-xs">
					<div className="flex items-center justify-between">
						<span className="text-muted-foreground font-medium">Posisi:</span>
						<div className="flex gap-1">
							{(["in", "out", "both"] as TransitionMode[]).map((mode) => (
								<button
									key={mode}
									type="button"
									onClick={() => setTransitionMode(mode)}
									className={cn(
										"px-2 py-0.5 rounded capitalize transition-colors font-medium",
										transitionMode === mode
											? "bg-secondary text-secondary-foreground shadow-xs font-semibold"
											: "text-muted-foreground hover:text-foreground",
									)}
								>
									{mode === "in"
										? "Masuk (In)"
										: mode === "out"
											? "Keluar (Out)"
											: "Kedua Sisi"}
								</button>
							))}
						</div>
					</div>

					<div className="flex items-center justify-between">
						<span className="text-muted-foreground font-medium">Durasi:</span>
						<div className="flex gap-1">
							{DURATIONS.map((dur) => (
								<button
									key={dur}
									type="button"
									onClick={() => setSelectedDuration(dur)}
									className={cn(
										"px-2 py-0.5 rounded transition-colors",
										selectedDuration === dur
											? "bg-secondary text-secondary-foreground shadow-xs font-semibold"
											: "text-muted-foreground hover:text-foreground",
									)}
								>
									{dur}s
								</button>
							))}
						</div>
					</div>
				</div>

				{/* Presets Grid */}
				<div
					className="grid gap-2.5"
					style={{
						gridTemplateColumns: "repeat(auto-fill, minmax(105px, 1fr))",
					}}
				>
					{filteredPresets.map((preset) => (
						<div
							key={preset.id}
							className="group relative flex flex-col items-center justify-between p-2.5 rounded-lg border bg-card hover:border-primary/50 transition-all text-center cursor-pointer overflow-hidden shadow-xs"
							onClick={() => handleApplyTransition(preset)}
						>
							{/* Visual animated preview icon box */}
							<div className="relative flex size-14 items-center justify-center rounded-md bg-muted/60 mb-2 overflow-hidden border">
								<div className="flex items-center justify-center size-8 rounded bg-primary/20 text-primary group-hover:scale-110 transition-transform">
									{preset.category === "Motion" ? (
										<HugeiconsIcon
											icon={ArrowRightDoubleIcon}
											className="size-5"
										/>
									) : preset.category === "Fade" ? (
										<HugeiconsIcon icon={FlashIcon} className="size-5" />
									) : preset.category === "Zoom" ? (
										<HugeiconsIcon icon={ViewIcon} className="size-5" />
									) : (
										<HugeiconsIcon
											icon={MagicWand05Icon}
											className="size-5"
										/>
									)}
								</div>
							</div>

							<span className="text-xs font-semibold truncate w-full">
								{preset.name}
							</span>
							<span className="text-[10px] text-muted-foreground line-clamp-1 mt-0.5">
								{preset.description}
							</span>

							{/* Quick Apply Button on Hover */}
							<div className="mt-2 w-full">
								<Button
									size="sm"
									variant="secondary"
									className="w-full h-6 text-[10px] px-1 font-medium"
									onClick={(e) => {
										e.stopPropagation();
										handleApplyTransition(preset);
									}}
								>
									Terapkan
								</Button>
							</div>
						</div>
					))}
				</div>
			</div>
		</PanelView>
	);
}
